import React from "react";
import ActivityTracker from "../components/ActivityTracker";

export default function Activities() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity Center</h1>
        <p className="text-gray-600">Track all your achievements, updates, and platform interactions</p>
      </div>

      {/* Activity Tracker */}
      <ActivityTracker />
    </div>
  );
}
