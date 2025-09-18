import React from "react";
import { NavLink } from "react-router-dom";
import { FiGrid, FiBook, FiAward, FiUsers, FiSettings, FiUser, FiFolder, FiBarChart, FiFileText } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";

export default function Sidebar() {
  const items = [
    { icon: FiGrid, label: "Dashboard", path: "/dashboard" },
    { icon: FiUser, label: "Profile", path: "/profile" },
    { icon: FiFolder, label: "Portfolio", path: "/portfolio" },
    { icon: FiBook, label: "Academics", path: "/academics" },
    { icon: FaTrophy, label: "Competitions", path: "/competitions" },
    { icon: FiAward, label: "Certifications", path: "/certifications" },
    { icon: FiUsers, label: "Volunteering", path: "/volunteering" },
    { icon: FiBarChart, label: "Analytics", path: "/analytics" },
    { icon: FiFileText, label: "Accreditation", path: "/accreditation" },
    { icon: FiSettings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="bg-blue-600 rounded-2xl p-3 text-white min-h-[80vh] flex flex-col items-center space-y-4">
      {items.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          title={item.label}
          className={({ isActive }) =>
            `p-3 rounded-xl transition-colors ${
              isActive
                ? "bg-blue-800 shadow-lg"
                : "hover:bg-blue-700"
            }`
          }
        >
          <item.icon className="w-6 h-6" />
        </NavLink>
      ))}
    </div>
  );
}
