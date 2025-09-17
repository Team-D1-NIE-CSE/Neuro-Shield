import React, { useState } from "react";

export default function AchievementForm({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({
    title: "",
    category: "Academics",
    sub: "",
    date: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null); // for toast replacement

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function onFile(e) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
    }
  }

  function submit() {
    if (!form.title) {
      setMessage({ text: "Title required", type: "warning" });
      return;
    }
    const newAch = {
      id: Date.now().toString(),
      ...form,
      status: "Pending",
      certificate: file
        ? { name: file.name, url: URL.createObjectURL(file) }
        : null,
    };
    onAdd(newAch);
    setForm({ title: "", category: "Academics", sub: "", date: "" });
    setFile(null);
    onClose();
    setMessage({ text: "Achievement submitted", type: "success" });
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {/* Modal content */}
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative border-t-4 border-[#5739ebff]">
          <h2 className="text-lg font-semibold mb-4 text-[#5739ebff]">
            Add Achievement
          </h2>
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-[#5739ebff] transition"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter achievement title"
                className="w-full border rounded px-3 py-2 text-sm 
                            text-gray-800 placeholder-gray-400 
                            focus:outline-none focus:ring-2 focus:ring-[#5739ebff] focus:border-[#5739ebff]"
                />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#5739ebff] focus:border-[#5739ebff]"
              >
                <option>Academics</option>
                <option>Competitions</option>
                <option>Certifications</option>
                <option>Leadership & Volunteering</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Details (grade / issuer / team)
              </label>
              <input
                name="sub"
                value={form.sub}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5739ebff] focus:border-[#5739ebff]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5739ebff] focus:border-[#5739ebff]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Upload Certificate (optional)
              </label>
              <input
                type="file"
                onChange={onFile}
                className="w-full text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#5739ebff] file:text-white hover:file:bg-purple-700 transition"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-[#5739ebff] text-white hover:bg-purple-700 transition"
              onClick={submit}
            >
              Submit (Pending Approval)
            </button>
          </div>
        </div>
      </div>

      {/* Simple toast replacement */}
      {message && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow text-white transition ${
            message.type === "success"
              ? "bg-green-600"
              : "bg-yellow-500 text-black"
          }`}
        >
          {message.text}
        </div>
      )}
    </>
  );
}
