import React from "react";
import MattixLogo from "./MattixLogo";
import { DownloadManager } from "./DownloadManager";

export interface StaticVersionModalProps {
  onClose: () => void;
  className?: string;
}

export const StaticVersionModal: React.FC<StaticVersionModalProps> = ({
  onClose,
  className = "",
}) => {
  return (
    <div
      id="staticVersion"
      className={`static-version-modal ${className}`}
      data-testid="static-version-modal"
    >
      <div className="modal-content">
        <div className="section-title">Static MATTIX Logo</div>

        <div className="static-grid">
          <div className="static-logo-item">
            <div className="static-logo-container">
              <MattixLogo
                animated={false}
                size={200}
                className="static-mattix-logo"
                data-testid="static-infinity-attix"
              />
            </div>
            <div className="static-logo-label">∞ATTIX</div>
          </div>

          <div className="static-logo-item">
            <div className="static-logo-container">
              <div
                className="static-mattix-text"
                style={{
                  fontSize: "34px",
                  fontWeight: 900,
                  background:
                    "linear-gradient(45deg, #4facfe 0%, #667eea 50%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 10px rgba(79, 172, 254, 0.5))",
                  letterSpacing: "6px",
                }}
                data-testid="static-mattix"
              >
                MATTIX
              </div>
            </div>
            <div className="static-logo-label">MATTIX</div>
          </div>

          <div className="static-logo-item">
            <div className="static-logo-container">
              <div
                className="static-infinity-symbol"
                style={{
                  fontSize: "64px",
                  fontWeight: 900,
                  background:
                    "linear-gradient(45deg, #4facfe 0%, #667eea 50%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 10px rgba(79, 172, 254, 0.5))",
                }}
                data-testid="static-infinity"
              >
                ∞
              </div>
            </div>
            <div className="static-logo-label">∞ Symbol</div>
          </div>
        </div>

        <div className="modal-controls">
          <DownloadManager />
          <button className="btn" onClick={onClose} data-testid="close-modal">
            Back to Animation
          </button>
        </div>
      </div>
    </div>
  );
};
