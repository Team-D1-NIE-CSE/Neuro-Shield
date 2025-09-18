import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Portfolio from "./pages/Portfolio";
import Academics from "./pages/Academics";
import Competitions from "./pages/Competitions";
import Certifications from "./pages/Certifications";
import Volunteering from "./pages/Volunteering";
import Analytics from "./pages/Analytics";
import Accreditation from "./pages/Accreditation";
import Settings from "./pages/Settings";
import Onboarding from "./pages/Onboarding";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="academics" element={<Academics />} />
        <Route path="competitions" element={<Competitions />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="volunteering" element={<Volunteering />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="accreditation" element={<Accreditation />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/onboarding" element={<Onboarding />} />
    </Routes>
  );
}
