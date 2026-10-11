import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Profile from "./pages/Profile";
import Sidebar from "./layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import StateAnalysis from "./pages/StateAnalysis";
import CropAnalysis from "./pages/CropAnalysis";
import YearlyTrends from "./pages/YearlyTrends";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/state-analysis" element={<StateAnalysis />} />
        <Route path="/crop-analysis" element={<CropAnalysis />} />
        <Route path="/yearly-trends" element={<YearlyTrends />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          style={{
            flex: 1,
            backgroundColor: "#f4f6f8",
            minHeight: "100vh",
          }}
        >
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;