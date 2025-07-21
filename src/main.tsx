import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import "./styles/gpu-acceleration.css";
import "./styles/performance-optimized.css";
import "./styles/logo-page-optimized.css";
import "./styles/home.css";
import "./styles/color-system.css";
import "./styles/logo-generator.css";
import "./styles/documentation.css";

// Load GPU testing utilities in development
if (process.env.NODE_ENV === 'development') {
  import('./utils/gpuTest').then(() => {
    console.log('🚀 GPU Test utilities loaded for development');
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
