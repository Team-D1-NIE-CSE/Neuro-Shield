import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import RightPanel from "./components/RightPanel";

export default function App() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="grid grid-cols-[80px_1fr_360px] gap-6 items-start">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[80vh]">
          <Header />
          <Dashboard />
        </div>

        {/* Right Panel */}
        <RightPanel />
      </div>
    </div>
  );
}