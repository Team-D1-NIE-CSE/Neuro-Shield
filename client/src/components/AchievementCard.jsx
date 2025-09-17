import React from "react";

export default function AchievementCard({ a }) {
  const statusColor =
    a.status === "Approved"
      ? "bg-green-100 text-green-700"
      : a.status === "Rejected"
      ? "bg-red-100 text-red-700"
      : "bg-orange-100 text-orange-700";

  // Special highlight for the Smart Scheduler project
  const titleColor =
    a.title === "Final Year Project - Smart Scheduler"
      ? "text-[#242424] font-bold"
      : "text-gray-800";

  return (
    <div className="p-4 rounded-md bg-gray-50 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        {/* Left section */}
        <div className="flex flex-col space-y-0">
          <p className={`font-semibold ${titleColor}`}>{a.title}</p>
          <p className="text-sm text-gray-600">
            {a.category} · {a.sub}
          </p>
          {a.date && <p className="text-xs text-gray-500">{a.date}</p>}
        </div>

        {/* Right section */}
        <div className="flex flex-col items-end space-y-2">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}
          >
            {a.status}
          </span>

          {a.certificate ? (
            <a
              href={a.certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 transition"
            >
              View Certificate
            </a>
          ) : (
            <button
              className="text-sm text-gray-400 px-3 py-1 rounded cursor-not-allowed"
              disabled
            >
              No Certificate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
