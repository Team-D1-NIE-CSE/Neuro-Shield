import React from "react";
import { FiGrid, FiBook, FiAward, FiUsers, FiSettings } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";

export default function Sidebar() {
  const items = [
    { icon: FiGrid, label: "Dashboard" },
    { icon: FiBook, label: "Academics" },
    { icon: FaTrophy, label: "Competitions" },
    { icon: FiAward, label: "Certifications" },
    { icon: FiUsers, label: "Volunteering" },
    { icon: FiSettings, label: "Settings" },
  ];

  return (
    <div className="bg-blue-600 rounded-2xl p-3 text-white min-h-[80vh] flex flex-col items-center space-y-6">
      {items.map((it) => (
        <button
          key={it.label}
          aria-label={it.label}
          title={it.label} // tooltip replacement
          className="p-3 rounded-xl hover:bg-blue-700 transition"
        >
          <it.icon className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
}
