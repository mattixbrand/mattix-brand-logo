import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogoPage from "./pages/LogoPage";
import ColorSystemPage from "./pages/ColorSystemPage";
import LogoGeneratorPage from "./pages/LogoGeneratorPage";
import DocumentationPage from "./pages/DocumentationPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logo" element={<LogoPage />} />
        <Route path="/colors" element={<ColorSystemPage />} />
        <Route path="/generator" element={<LogoGeneratorPage />} />
        <Route path="/docs" element={<DocumentationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
