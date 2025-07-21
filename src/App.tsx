import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogoPage from "./pages/LogoPage";
import ColorSystemPage from "./pages/ColorSystemPage";
import LogoGeneratorPage from "./pages/LogoGeneratorPage";
import DocumentationPage from "./pages/DocumentationPage";
import AboutPage from "./pages/AboutPage";
import BrandGuidelinesPage from "./pages/BrandGuidelinesPage";
import DownloadPage from "./pages/DownloadPage";
import { PerformanceDebugger } from "./hooks/usePerformanceMonitor";
import { gtmPageView, initializeGTM } from "./utils/gtm";

// Component to track route changes
const RouteTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    gtmPageView(location.pathname);
  }, [location]);

  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    // Initialize GTM tracking
    initializeGTM();
  }, []);

  return (
    <>
      <Router>
        <RouteTracker />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/logo" element={<LogoPage />} />
          <Route path="/colors" element={<ColorSystemPage />} />
          <Route path="/generator" element={<LogoGeneratorPage />} />
          <Route path="/docs" element={<DocumentationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/brand-guidelines" element={<BrandGuidelinesPage />} />
          <Route path="/download" element={<DownloadPage />} />
        </Routes>
      </Router>
      
      {/* Performance debugger - only shows in development */}
      <PerformanceDebugger position="top-right" />
    </>
  );
};

export default App;
