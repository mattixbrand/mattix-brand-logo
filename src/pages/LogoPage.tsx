import React, { useState } from "react";
import MattixLogo, { InfinityLoader } from "../components/MattixLogo";
import { DownloadManager } from "../components/DownloadManager";
import { CodePreview } from "../components/CodePreview";
import { StaticVersionModal } from "../components/StaticVersionModal";
import {
  RiFileCopyLine,
  RiCheckLine,
  RiErrorWarningLine,
} from "@remixicon/react";

// Toast interface
interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
  isVisible: boolean;
}

const LogoPage: React.FC = () => {
  const [showStaticVersion, setShowStaticVersion] = useState(false);
  const [showCodePreview, setShowCodePreview] = useState(false);
  const [codePreviewType, setCodePreviewType] = useState<"logo" | "loading">(
    "logo"
  );
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast notification system
  const addToast = (message: string, type: "success" | "error" = "success") => {
    const id = Date.now().toString();
    const toast: Toast = { id, message, type, isVisible: true };

    setToasts((prev) => [...prev, toast]);

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Enhanced copy to clipboard functionality with visual feedback and toast
  const handleCopyCode = (
    type: "logo" | "loading" = "logo",
    event?: React.MouseEvent
  ) => {
    setCodePreviewType(type);
    setShowCodePreview(true);

    // Copy appropriate code to clipboard
    const code =
      type === "loading" ? getInfinityLoaderCode() : getMattixLogoCode();

    navigator.clipboard
      .writeText(code)
      .then(() => {
        addToast(
          `✅ Copied ${
            type === "logo" ? "React Logo" : "Loading Component"
          } code!`,
          "success"
        );

        // Add visual feedback to clicked button
        if (event?.currentTarget) {
          const button = event.currentTarget as HTMLElement;
          button.style.transform = "scale(0.95)";
          button.style.background = "var(--mattix-gradient)";
          setTimeout(() => {
            button.style.transform = "";
            button.style.background = "";
          }, 150);
        }
      })
      .catch(() => {
        addToast(
          `❌ Failed to copy ${
            type === "logo" ? "React Logo" : "Loading Component"
          } code`,
          "error"
        );
        console.error("Failed to copy code to clipboard");
      });

    setTimeout(() => setShowCodePreview(false), 3000);
  };

  const getMattixLogoCode = () => {
    return `import React from 'react';
import { MattixLogo } from './MattixLogo';

const App = () => {
  return (
    <div>
      <MattixLogo 
        animated={true}
        size={280}
        className="morphing-logo"
      />
    </div>
  );
};

export default App;`;
  };

  const getInfinityLoaderCode = () => {
    return `import React from 'react';
import { InfinityLoader } from './MattixLogo';

const LoadingComponent = () => {
  return (
    <div>
      <InfinityLoader 
        size={64}
        className="loading-symbol"
      />
    </div>
  );
};

export default LoadingComponent;`;
  };

  return (
    <div className="app">
      <h1
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "32px",
          margin: "20px",
        }}
      >
        MATTIX LOGO APP
      </h1>

      {/* MAIN LOGO SECTION */}
      <div className="main-logo-section">
        <div className="section-title">MATTIX Logo Animation</div>

        <div className="logo-container">
          <MattixLogo
            animated={true}
            size={280}
            className="morphing-logo"
            data-testid="main-logo"
          />
        </div>

        <div className="controls">
          <button
            className="btn primary"
            onClick={() => setShowStaticVersion(true)}
          >
            Capture MATTIX Logo
          </button>
          <button
            className="btn copy-btn"
            onClick={(e) => handleCopyCode("logo", e)}
            title="Copy React Logo code to clipboard"
          >
            <RiFileCopyLine size={16} />
            Copy React Code
          </button>
          <DownloadManager type="logo" />
        </div>

        {showCodePreview && codePreviewType === "logo" && (
          <CodePreview type="logo" />
        )}
      </div>

      {/* LOADING SYMBOL SECTION */}
      <div className="loading-section">
        <div className="section-title">Loading Component</div>
        <div className="loading-container">
          <InfinityLoader data-testid="infinity-loader" />
        </div>
        <div className="loading-description">
          Perfect for loading states and transitions
        </div>
        <div className="controls">
          <button
            className="btn copy-btn"
            onClick={(e) => handleCopyCode("loading", e)}
            title="Copy Loading Component code to clipboard"
          >
            <RiFileCopyLine size={16} />
            Copy Loading Code
          </button>
          <DownloadManager type="loading" />
        </div>

        {showCodePreview && codePreviewType === "loading" && (
          <CodePreview type="loading" />
        )}
      </div>

      {/* Static Version Modal */}
      {showStaticVersion && (
        <StaticVersionModal onClose={() => setShowStaticVersion(false)} />
      )}

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            onClick={() => removeToast(toast.id)}
          >
            <div className="toast-content">
              {toast.type === "success" ? (
                <RiCheckLine size={18} />
              ) : (
                <RiErrorWarningLine size={18} />
              )}
              <span>{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoPage;
