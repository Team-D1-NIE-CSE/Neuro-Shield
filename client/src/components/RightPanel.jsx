import React from "react";
import { FiCalendar, FiClock, FiTrendingUp, FiBell } from "react-icons/fi";
import ActivityTracker from "./ActivityTracker";

export default function RightPanel() {
  const upcomingDeadlines = [
    { title: "Project Submission", date: "Tomorrow", urgent: true },
    { title: "Midterm Exam", date: "Oct 15", urgent: false },
    { title: "Research Paper", date: "Oct 20", urgent: false },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="w-5 h-5 text-blue-500" />
          Quick Stats
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Achievements</span>
            <span className="font-semibold text-blue-600">24</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Verified</span>
            <span className="font-semibold text-green-600">18</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Portfolio Views</span>
            <span className="font-semibold text-purple-600">156</span>
          </div>
        </div>
      </div>

      {/* XP Points Box */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#E3A71E] mb-1">2,400</div>
          <div className="text-sm text-gray-600 mb-4">Achievement Points</div>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View Leaderboard
          </button>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiCalendar className="w-5 h-5 text-orange-500" />
          Upcoming Deadlines
        </h3>
        <div className="space-y-3">
          {upcomingDeadlines.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiClock className={`w-4 h-4 ${
                  item.urgent ? "text-red-500" : "text-gray-400"
                }`} />
                <span className={`text-sm ${
                  item.urgent ? "font-medium text-red-700" : "text-gray-700"
                }`}>
                  {item.title}
                </span>
              </div>
              <span className="text-xs text-gray-500">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
