import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DistancePage from "./pages/DistancePage";
import HistoryPage from "./pages/HistoryPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<DistancePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
