import React from "react";

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Left section */}
      <div className="flex flex-col space-y-0">
        <div className="flex items-center space-x-2">
          <p className="text-2xl font-bold text-[#5739ebff]">Hello, Sir</p>
          <span role="img" aria-hidden>
            👋
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Nice to have you back — continue your learning!
        </p>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm text-gray-500">Class</p>
          <p className="font-semibold text-gray-500">B.Tech - 3rd Sem</p>
        </div>
        {/* Avatar */}
        <img
          src="https://ui-avatars.com/api/?name Sir+Maulana&background=random"
          alt= "Sir"
          className="w-10 h-10 rounded-full border-2 border-brand-500 shadow-sm"
        />
      </div>
    </div>
  );
}
