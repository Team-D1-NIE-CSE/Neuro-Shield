import React, { useState } from "react";
import OverallScoreWidget from "../components/OverallScoreWidget";
import AchievementForm from "../components/AchievementForm";
import AchievementCard from "../components/AchievementCard";
import MOCK from "../data/mockAchievements";

export default function Dashboard() {
  const [achievements, setAchievements] = useState(MOCK);
  const [isFormOpen, setFormOpen] = useState(false);

  function addAchievement(item) {
    setAchievements((s) => [item, ...s]);
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Header row */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <OverallScoreWidget overallScore={8.6} />
          <div>
            <p className="font-bold text-[#242424]">Overview</p>
            <p className="text-sm text-gray-500">
              Overall Score, achievements and quick actions
            </p>
          </div>
        </div>

        <button
          onClick={() => setFormOpen(true)}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          + Add Achievement
        </button>
      </div>

      {/* Achievements section */}
      <div>
        <p className="text-lg font-semibold mb-3 text-[#242424]">Achievements</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((a) => (
            <AchievementCard key={a.id} a={a} />
          ))}
        </div>
      </div>

      {/* Achievement Form Modal */}
      <AchievementForm
        isOpen={isFormOpen}
        onClose={() => setFormOpen(false)}
        onAdd={addAchievement}
      />
    </div>
  );
}
