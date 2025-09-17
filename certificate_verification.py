import argparse
import json
import os
import re
import sys
from dataclasses import dataclass, asdict
from typing import List, Dict, Any, Optional, Tuple
import requests
from bs4 import BeautifulSoup
import logging  

# OCR for raster images
try:
	import pytesseract  
	has_tesseract = True
except Exception:
	has_tesseract = False

# PDF/Image handling
try:
	import fitz  
except Exception as exc:
	print("PyMuPDF (fitz) is required. Install with: pip install pymupdf", file=sys.stderr)
	raise

import cv2 
from PIL import Image


URL_REGEX = re.compile(r"https?://[\w\-\.\:/%\?\#\[\]@!\$&'\(\)\*\+,;=]+", re.IGNORECASE)
SUPPORTED_IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".tif", ".tiff", ".webp", ".bmp"}


@dataclass
class CredentialField:
	name: str
	pattern: re.Pattern


@dataclass
class VerificationResult:
	link: str
	status: str  # "verified" ya "unverified" 
	reason: str
	matched_fields: List[str]
	source_content_sample: str


@dataclass
class ExtractedCertificate:
	all_text: str
	urls: List[str]
	qr_urls: List[str]


# Yeh default patterns generic certificates ke liye hain 
DEFAULT_FIELDS: List[CredentialField] = [
	CredentialField("name", re.compile(r"\b(name|candidate|student)\s*[:\-]\s*(?P<val>.+)", re.IGNORECASE)),
	CredentialField("id", re.compile(r"\b(id|registration|roll|certificate)\s*(no\.|number)?\s*[:\-]\s*(?P<val>[A-Z0-9\-]+)", re.IGNORECASE)),
	CredentialField("date", re.compile(r"\b(date|issued on|issue date)\s*[:\-]\s*(?P<val>[0-9]{1,2}[\-/][0-9]{1,2}[\-/][0-9]{2,4}|[A-Za-z]{3,9}\s+[0-9]{1,2},?\s+[0-9]{2,4})", re.IGNORECASE)),
	CredentialField("course", re.compile(r"\b(course|program|degree)\s*[:\-]\s*(?P<val>.+)", re.IGNORECASE)),
]


def read_file_bytes(path: str) -> bytes:
	with open(path, "rb") as f:
		return f.read()


def extract_text_and_urls_from_pdf(path: str) -> ExtractedCertificate:
	# PDF se direct text aur links nikaal rahe hain 
	logging.info("opening pdf: %s", path)
	doc = fitz.open(path)
	all_text_parts: List[str] = []
	urls: List[str] = []
	qr_urls: List[str] = []
	for page_index in range(len(doc)):
		page = doc.load_page(page_index)
		text = page.get_text("text") or ""
		all_text_parts.append(text)
		urls.extend(URL_REGEX.findall(text))
		# Page images me QR scan 
		image_list = page.get_images(full=True)
		for img in image_list:
			xref = img[0]
			pix = fitz.Pixmap(doc, xref)
			if pix.alpha:
				pix = fitz.Pixmap(fitz.csRGB, pix)
			img_bytes = pix.tobytes("png")
			qr_urls.extend(decode_qr_urls_from_image_bytes(img_bytes))
			pix = None  
	# Link annotations 
	for page_index in range(len(doc)):
		page = doc.load_page(page_index)
		links = page.get_links()
		for link in links:
			uri = link.get("uri")
			if uri:
				urls.append(uri)

	all_text = "\n".join(all_text_parts)
	logging.info("PDF has %d unique URLs and %d QR ", len(set(urls)), len(set(qr_urls)))
	return ExtractedCertificate(all_text=all_text, urls=sorted(set(urls)), qr_urls=sorted(set(qr_urls)))


def extract_text_and_urls_from_image(path: str) -> ExtractedCertificate:
	# Image certificate ho to OCR try 
	img = Image.open(path)
	text = ""
	if has_tesseract:
		try:
			text = pytesseract.image_to_string(img)
		except Exception:
			text = ""
	urls = URL_REGEX.findall(text) if text else []
	qr_urls = decode_qr_urls_from_image_path(path)
	logging.info("Image se %d URLs aur %d QR URLs mile", len(set(urls)), len(set(qr_urls)))
	return ExtractedCertificate(all_text=text, urls=sorted(set(urls)), qr_urls=sorted(set(qr_urls)))


def decode_qr_urls_from_image_path(path: str) -> List[str]:
	with open(path, "rb") as f:
		return decode_qr_urls_from_image_bytes(f.read())


def decode_qr_urls_from_image_bytes(data: bytes) -> List[str]:
	# QR code detect karke URL nikaala
	np_arr = np_from_buffer(data)
	if np_arr is None:
		return []
	img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
	if img is None:
		return []
	detector = cv2.QRCodeDetector()
	val, points, straight_qrcode = detector.detectAndDecode(img)
	urls: List[str] = []
	if isinstance(val, str) and val:
		if val.lower().startswith("http://") or val.lower().startswith("https://"):
			urls.append(val)
	try:
		retval, decoded_info, points, _ = detector.detectAndDecodeMulti(img)
		if retval and decoded_info:
			for v in decoded_info:
				if v and (v.lower().startswith("http://") or v.lower().startswith("https://")):
					urls.append(v)
	except Exception:
		pass
	return sorted(set(urls))


def np_from_buffer(buf: bytes):
	import numpy as np  #local import 
	return np.frombuffer(buf, dtype=np.uint8)


def parse_credential_fields_from_text(text: str) -> Dict[str, str]:
	# Certificate text se key fields extract
	lines = [l.strip() for l in text.splitlines() if l.strip()]
	found: Dict[str, str] = {}
	for field in DEFAULT_FIELDS:
		for line in lines:
			m = field.pattern.search(line)
			if m:
				val = m.groupdict().get("val", "").strip()
				if val:
					found[field.name] = val
	return found

# Coursera-specific
COURSE_DATE_REGEX = re.compile(r"\b([A-Za-z]{3,9})\s+([0-9]{1,2}),?\s+([0-9]{4})\b")
VERIFY_ID_REGEX = re.compile(r"coursera\.org/verify/([A-Za-z0-9]+)", re.IGNORECASE)


def parse_coursera_fields(text: str, links: List[str]) -> Dict[str, str]:
	fields: Dict[str, str] = {}
	lines = [l.strip() for l in text.splitlines() if l.strip()]
	for i, line in enumerate(lines):
		if re.search(r"^Completed by\b", line, re.IGNORECASE):
			for j in range(i + 1, min(i + 6, len(lines))):
				if lines[j]:
					fields.setdefault("name", lines[j])
					break
			break
	for i, line in enumerate(lines):
		if re.search(r"^Course Certificate\b", line, re.IGNORECASE):
			for j in range(i + 1, min(i + 6, len(lines))):
				candidate = lines[j]
				if candidate and not re.search(r"^(Completed by|Issued by|Issued on|Date)\b", candidate, re.IGNORECASE):
					fields.setdefault("course", candidate)
					break
			if "course" not in fields and i > 0 and lines[i - 1]:
				fields.setdefault("course", lines[i - 1])
			break
	# Date nikaalna
	m = COURSE_DATE_REGEX.search(text)
	if m:
		fields.setdefault("date", m.group(0))
	# Verify URL se ID retrive
	for url in links:
		m2 = VERIFY_ID_REGEX.search(url)
		if m2:
			fields.setdefault("id", m2.group(1))
			break
	return fields


def parse_coursera_fields_from_page_text(text: str) -> Dict[str, str]:
	fields: Dict[str, str] = {}
	m_name = re.search(r"Completed by\s+([^\n]+)", text, re.IGNORECASE)
	if m_name:
		fields["name"] = m_name.group(1).strip()
	m_course_block = re.search(r"Course Certificate\s+([^\n]+)", text, re.IGNORECASE)
	if m_course_block:
		candidate = m_course_block.group(1).strip()
		if candidate and not re.match(r"^(Completed by|Issued by|Issued on|Date)$", candidate, re.IGNORECASE):
			fields["course"] = candidate
	m_date = COURSE_DATE_REGEX.search(text)
	if m_date:
		fields["date"] = m_date.group(0)
	return fields


def fetch_url(url: str, timeout: int, user_agent: str) -> Tuple[Optional[str], Optional[str]]:
	# URL fetch karte waqt errors handle 
	try:
		headers = {"User-Agent": user_agent, "Accept": "text/html,application/json;q=0.9,*/*;q=0.8"}
		resp = requests.get(url, headers=headers, timeout=timeout, allow_redirects=True)
		resp.raise_for_status()
		content_type = resp.headers.get("Content-Type", "").lower()
		text: Optional[str] = None
		if "application/json" in content_type or resp.text.strip().startswith("{"):
			text = resp.text
		elif "text/html" in content_type or "application/xhtml+xml" in content_type or "text/plain" in content_type:
			text = resp.text
		else:
			text = resp.text
		logging.info("Fetched %s (content-type: %s)", url, content_type or "unknown")
		return text, content_type
	except requests.RequestException as exc:
		logging.warning("Request failed for %s: %s", url, exc)
		return None, f"request_error:{exc.__class__.__name__}:{str(exc)[:200]}"
	except Exception as exc:
		logging.error("Unexpected error for %s: %s", url, exc)
		return None, f"unexpected_error:{exc.__class__.__name__}:{str(exc)[:200]}"


def extract_text_from_response(text: str, content_type: Optional[str]) -> str:
	# HTML/JSON se readable text
	if not text:
		return ""
	if content_type and "application/json" in content_type:
		try:
			obj = json.loads(text)
			return json.dumps(obj, indent=2, ensure_ascii=False)
		except Exception:
			return text
	soup = BeautifulSoup(text, "html.parser")
	for tag in soup(["script", "style", "noscript"]):
		tag.extract()
	visible = soup.get_text("\n")
	return visible


def normalize(s: str) -> str:
	return re.sub(r"\s+", " ", s).strip().lower()


def loose_contains(haystack: str, needle: str) -> bool:
	return normalize(needle) in normalize(haystack)


def verify_against_content(cert_fields: Dict[str, str], page_text: str, mode: str) -> Tuple[bool, List[str]]:
	# Fields ko page text se compare karna 
	matched: List[str] = []
	if not cert_fields:
		return False, matched
	for key, value in cert_fields.items():
		if not value:
			continue
		if mode == "exact":
			if value.lower() in page_text.lower():
				matched.append(key)
		else:
			if loose_contains(page_text, value):
				matched.append(key)
	return (len(matched) >= max(1, len(cert_fields) - 1)), matched


def classify_link(url: str, cert_fields: Dict[str, str], timeout: int, user_agent: str, match_mode: str) -> VerificationResult:
	# Coursera verify link ke liye logic 
	m = VERIFY_ID_REGEX.search(url)
	if m and cert_fields.get("id") and m.group(1) == cert_fields.get("id"):
		text, content_type = fetch_url(url, timeout=timeout, user_agent=user_agent)
		if text is None:
			return VerificationResult(link=url, status="verified", reason="coursera_verify_link_match", matched_fields=["id"], source_content_sample="")
		page_text = extract_text_from_response(text, content_type)
		page_fields = parse_coursera_fields_from_page_text(page_text)
		matched_keys: List[str] = ["id"]
		for k in ["name", "course", "date"]:
			if cert_fields.get(k) and page_fields.get(k):
				if match_mode == "exact":
					if cert_fields[k].lower() == page_fields[k].lower():
						matched_keys.append(k)
				else:
					if loose_contains(page_fields[k], cert_fields[k]):
						matched_keys.append(k)
		status = "verified" if len(matched_keys) >= 2 else "unverified"
		reason = "coursera_verify_id_plus_fields" if len(matched_keys) >= 2 else "coursera_verify_id_only"
		return VerificationResult(link=url, status=status, reason=reason, matched_fields=matched_keys if status == "verified" else ["id"], source_content_sample=page_text[:2000])

	text, content_type = fetch_url(url, timeout=timeout, user_agent=user_agent)
	if text is None:
		return VerificationResult(link=url, status="unverified", reason=str(content_type or "fetch_failed"), matched_fields=[], source_content_sample="")
	page_text = extract_text_from_response(text, content_type)
	ok, matched = verify_against_content(cert_fields, page_text, mode=match_mode)
	sample = page_text[:5000]
	return VerificationResult(link=url, status=("verified" if ok else "unverified"), reason=("match" if ok else "mismatch"), matched_fields=matched, source_content_sample=sample)


def run(args: argparse.Namespace) -> Dict[str, Any]:
	# CLI args ke basis pe verify process 
	if args.log_level:
		logging.basicConfig(level=getattr(logging, args.log_level.upper(), logging.INFO), format="%(levelname)s %(message)s")
	else:
		logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")

	input_path = args.input
	if not os.path.exists(input_path):
		raise FileNotFoundError(f"Input not found: {input_path}")
	logging.info("Input file: %s", input_path)

	root, ext = os.path.splitext(input_path)
	ext_lower = ext.lower()
	if ext_lower == ".pdf":
		cert = extract_text_and_urls_from_pdf(input_path)
	elif ext_lower in SUPPORTED_IMAGE_EXTS:
		cert = extract_text_and_urls_from_image(input_path)
	else:
		raise ValueError("Unsupported file type. Provide PDF or common image.")

	cert_fields = parse_credential_fields_from_text(cert.all_text)
	coursera_fields = parse_coursera_fields(cert.all_text, cert.urls + cert.qr_urls)
	for k, v in coursera_fields.items():
		cert_fields.setdefault(k, v)
	logging.info("Extracted fields: %s", cert_fields)

	all_links = sorted(set(cert.urls + cert.qr_urls))
	results: List[VerificationResult] = []
	for link in all_links:
		results.append(classify_link(link, cert_fields, timeout=args.timeout, user_agent=args.user_agent, match_mode=args.match_mode))

	verified_count = sum(1 for r in results if r.status == "verified")
	summary = {
		"input": input_path,
		"total_links": len(all_links),
		"verified": verified_count,
		"unverified": len(all_links) - verified_count,
		"extracted_fields": cert_fields,
	}

	payload = {
		"summary": summary,
		"links": [asdict(r) for r in results],
	}

	# console
	if args.out_json:
		with open(args.out_json, "w", encoding="utf-8") as f:
			json.dump(payload, f, indent=2, ensure_ascii=False)
	if args.out_csv:
		write_csv(args.out_csv, results)

	print_summary_and_details(payload)
	return payload


def write_csv(path: str, results: List[VerificationResult]) -> None:
	import csv
	with open(path, "w", newline="", encoding="utf-8") as f:
		writer = csv.writer(f)
		writer.writerow(["link", "status", "reason", "matched_fields", "source_content_sample"])
		for r in results:
			writer.writerow([r.link, r.status, r.reason, ";".join(r.matched_fields), r.source_content_sample.replace("\n", " ")[:10000]])


def print_summary_and_details(payload: Dict[str, Any]) -> None:
	# Console output 
	s = payload["summary"]
	print(f"Checked {s['total_links']} link(s). Verified: {s['verified']} | Unverified: {s['unverified']}")
	if s.get("extracted_fields"):
		print("Extracted credential fields:")
		for k, v in s["extracted_fields"].items():
			print(f"  - {k}: {v}")
	print("\nPer-link results:")
	for r in payload["links"]:
		print(f"- Link: {r['link']}")
		print(f"  Status: {r['status']}  Reason: {r['reason']}")
		if r.get("matched_fields"):
			print(f"  Matched fields: {', '.join(r['matched_fields'])}")
		if r.get("source_content_sample"):
			print("  Page text sample:")
			print("    " + r["source_content_sample"].replace("\n", "\n    ")[:800])


def build_arg_parser() -> argparse.Namespace:
	p = argparse.ArgumentParser(description="Verify certificate links and QR codes against certificate contents")
	p.add_argument("--input", required=True, help="Path to certificate file (PDF or image)")
	p.add_argument("--out-json", dest="out_json", default=None, help="Path to JSON output file")
	p.add_argument("--out-csv", dest="out_csv", default=None, help="Path to CSV output file")
	p.add_argument("--timeout", type=int, default=10, help="HTTP timeout seconds")
	p.add_argument("--user-agent", dest="user_agent", default="CertVerifier/1.0", help="HTTP User-Agent")
	p.add_argument("--match-mode", dest="match_mode", choices=["exact", "loose"], default="loose", help="Matching mode")
	p.add_argument("--log-level", dest="log_level", default="INFO", help="Logging level: DEBUG, INFO, WARNING, ERROR")
	return p.parse_args()


if __name__ == "__main__":
	args = build_arg_parser()
	run(args)
