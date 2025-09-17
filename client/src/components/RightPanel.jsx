import React from "react";

export default function RightPanel() {
  return (
    <div className="flex flex-col space-y-4">
      {/* XP Box */}
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <p className="font-bold text-[#E3A71E]">2400 XP</p>
        <p className="text-sm text-gray-500">Points</p>
        <button className="mt-3 px-3 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700">
          Collect Point
        </button>
      </div>

      {/* Learning Activity Box */}
      <div className="p-4 bg-white rounded-lg shadow-sm min-h-[220px]">
        <p className="font-semibold mb-2 text-[#242424]">Learning activity</p>
        <div className="h-[160px] rounded-md bg-gray-50 flex items-center justify-center">
          <p className="text-gray-400">
            [Chart placeholder — integrate chart library later]
          </p>
        </div>
      </div>
    </div>
  );
}
