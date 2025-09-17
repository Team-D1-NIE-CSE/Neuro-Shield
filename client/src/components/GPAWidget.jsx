import React from "react";

export default function GPAWidget({ gpa = 8.6 }) {
  // Map GPA (10) to percent for circular progress (e.g., 8.6 => 86%)
  const percent = Math.round((gpa / 10) * 100);

  return (
    <div className="rounded-lg p-4 bg-gray-50 shadow-sm max-w-[220px]">
      <div className="flex flex-col items-center space-y-2">
        {/* Circle with centered GPA */}
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90">
            {/* Track */}
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="#e5e7eb" /* gray-200 */
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress */}
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="#5739eb" /* your brand purple */
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 42}
              strokeDashoffset={
                2 * Math.PI * 42 - (percent / 100) * (2 * Math.PI * 42)
              }
              strokeLinecap="round"
            />
          </svg>
          {/* Centered GPA text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-800">{gpa}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">Current GPA</p>
      </div>
    </div>
  );
}
