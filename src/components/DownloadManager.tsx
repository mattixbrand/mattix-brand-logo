import React from "react";
import JSZip from "jszip";

export interface DownloadManagerProps {
  className?: string;
  type?: "logo" | "loading";
}

export const DownloadManager: React.FC<DownloadManagerProps> = ({
  className = "",
  type = "logo",
}) => {
  const downloadLoadingComponent = () => {
    const componentCode =
      type === "loading" ? getInfinityLoaderCode() : getMattixLogoCode();

    // Create a ZIP file with both component and CSS
    if (typeof window !== "undefined" && (window as any).JSZip) {
      const zip = new (window as any).JSZip();

      // Add the React component
      zip.file(
        type === "loading" ? "InfinityLoader.tsx" : "MattixLogo.tsx",
        componentCode
      );

      // Add the CSS file if it's the loading component
      if (type === "loading") {
        const cssContent = getLoadingComponentCSS();
        zip.file("styles.css", cssContent);
      }

      const generatePromise = zip.generateAsync({ type: "blob" });
      if (generatePromise && generatePromise.then) {
        generatePromise
          .then(function (content: any) {
            try {
              const url = URL.createObjectURL(content);
              const a = document.createElement("a");
              a.href = url;
              a.download =
                type === "loading"
                  ? "InfinityLoader-with-styles.zip"
                  : "MattixLogo.tsx";
              a.click();
              URL.revokeObjectURL(url);
            } catch (error) {
              console.error("Error creating download link:", error);
            }
          })
          .catch((error: Error) => {
            console.error("Error generating ZIP file:", error);
          });
      }
    } else {
      // Fallback to single file download
      try {
        const blob = new Blob([componentCode], { type: "text/typescript" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download =
          type === "loading" ? "InfinityLoader.tsx" : "MattixLogo.tsx";
        a.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error creating fallback download:", error);
      }
    }
  };

  const getLoadingComponentCSS = () => {
    return `/* Loading Component CSS - Include this in your project */
.loading-text {
  font-size: 48px;
  font-weight: 900;
  background: linear-gradient(45deg, #4facfe 0%, #667eea 50%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(79, 172, 254, 0.5));
  animation: snakeLoadingPulse 3s ease-in-out infinite;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
}

.loading-text:hover {
  filter: drop-shadow(0 0 20px rgba(79, 172, 254, 0.8));
  transform: scale(1.1);
  animation-duration: 1.5s;
}

/* Enhanced loading pulse with snake-like movement */
@keyframes snakeLoadingPulse {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: scale(1.1) rotate(90deg);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 0.6;
  }
  75% {
    transform: scale(1.1) rotate(270deg);
    opacity: 0.8;
  }
}

/* Alternative simpler animation if you prefer */
@keyframes loadingPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}`;
  };

  const getMattixLogoCode = () => {
    return `import React from 'react';

export interface MattixLogoProps {
  animated?: boolean;
  size?: number;
  className?: string;
  'data-testid'?: string;
}

export interface InfinityLoaderProps {
  size?: number;
  className?: string;
  'data-testid'?: string;
}

const MattixLogo: React.FC<MattixLogoProps> = ({ 
  animated = true, 
  size = 280, 
  className = '',
  'data-testid': testId
}) => {
  if (animated) {
    return (
      <svg 
        width={size} 
        height={size * 0.36} 
        viewBox="0 0 280 100"
        className={className}
        data-testid={testId}
      >
        <defs>
          <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#00f2fe', stopOpacity: 0.6 }} />
            <stop offset="30%" style={{ stopColor: '#4facfe', stopOpacity: 0.9 }} />
            <stop offset="50%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
            <stop offset="70%" style={{ stopColor: '#667eea', stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 0.6 }} />
          </linearGradient>
          <filter id="snakeGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          fill="none"
          stroke="url(#snakeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#snakeGlow)"
          strokeDasharray="40 160"
          strokeDashoffset="0"
          d="M45,50 C45,25 25,25 25,50 C25,75 45,75 45,50 C45,25 65,25 65,50 C65,75 45,75 45,50"
        >
          <animate
            attributeName="d"
            values="M45,50 C45,25 25,25 25,50 C25,75 45,75 45,50 C45,25 65,25 65,50 C65,75 45,75 45,50;
                           M40,50 C40,30 30,30 30,50 C30,70 40,70 40,50 C40,30 50,30 50,50 C50,70 40,70 40,50;
                           M30,75 L30,40 Q30,25 35,25 Q40,20 45,25 Q50,20 55,25 Q60,25 60,40 L60,75;
                           M28,75 L28,35 Q28,20 35,20 Q42,15 45,20 Q48,15 55,20 Q62,20 62,35 L62,75;
                           M30,75 L30,40 Q30,25 35,25 Q40,20 45,25 Q50,20 55,25 Q60,25 60,40 L60,75;
                           M40,50 C40,30 30,30 30,50 C30,70 40,70 40,50 C40,30 50,30 50,50 C50,70 40,70 40,50;
                           M45,50 C45,25 25,25 25,50 C25,75 45,75 45,50 C45,25 65,25 65,50 C65,75 45,75 45,50"
            dur="12s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            keyTimes="0;0.15;0.35;0.5;0.65;0.85;1"
          />
          <animate
            attributeName="stroke-dashoffset"
            values="0;-200;-400"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            values="8;12;8"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>

        <text
          x="100"
          y="60"
          fontFamily="Arial, sans-serif"
          fontSize="38"
          fontWeight="900"
          letterSpacing="6"
          fill="url(#snakeGradient)"
          filter="url(#snakeGlow)"
        >
          ATTIX
        </text>
      </svg>
    );
  }

  return (
    <div 
      style={{
        fontSize: size * 0.17 + 'px',
        fontWeight: 900,
        background: 'linear-gradient(45deg, #4facfe 0%, #667eea 50%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 0 10px rgba(79, 172, 254, 0.5))'
      }}
      className={className}
      data-testid={testId}
    >
      ∞ATTIX
    </div>
  );
};

const InfinityLoader: React.FC<InfinityLoaderProps> = ({ 
  size = 48,
  className = '',
  'data-testid': testId
}) => (
  <div 
    style={{
      fontSize: size + 'px',
      fontWeight: 900,
      background: 'linear-gradient(45deg, #4facfe 0%, #667eea 50%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      filter: 'drop-shadow(0 0 10px rgba(79, 172, 254, 0.5))',
      animation: 'loadingPulse 2s ease-in-out infinite'
    }}
    className={className}
    data-testid={testId}
  >
    ∞
  </div>
);

export { MattixLogo, InfinityLoader };
export default MattixLogo;`;
  };

  const getInfinityLoaderCode = () => {
    return `import React from 'react';
import './styles.css'; // Make sure to include the CSS file with animations

export interface InfinityLoaderProps {
  size?: number;
  className?: string;
  'data-testid'?: string;
}

const InfinityLoader: React.FC<InfinityLoaderProps> = ({ 
  size = 48,
  className = '',
  'data-testid': testId
}) => (
  <div 
    className={\`loading-text \${className}\`}
    style={{
      fontSize: size + 'px',
    }}
    data-testid={testId}
  >
    ∞
  </div>
);

export { InfinityLoader };
export default InfinityLoader;`;
  };

  const downloadSVG = () => {
    const createAnimatedMorphingSVG =
      (): string => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="280" height="100" viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#00f2fe;stop-opacity:0.6" />
            <stop offset="30%" style="stop-color:#4facfe;stop-opacity:0.9" />
            <stop offset="50%" style="stop-color:#ffffff;stop-opacity:1" />
            <stop offset="70%" style="stop-color:#667eea;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:0.6" />
        </linearGradient>
        <filter id="snakeGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
    
    <path fill="none" 
          stroke="url(#snakeGradient)" 
          stroke-width="8" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          filter="url(#snakeGlow)"
          stroke-dasharray="40 160"
          stroke-dashoffset="0"
          d="M45,50 C45,25 25,25 25,50 C25,75 45,75 45,50 C45,25 65,25 65,50 C65,75 45,75 45,50">
        
        <animate attributeName="d" 
                 values="M45,50 C45,25 25,25 25,50 C25,75 45,75 45,50 C45,25 65,25 65,50 C65,75 45,75 45,50;
                         M40,50 C40,30 30,30 30,50 C30,70 40,70 40,50 C40,30 50,30 50,50 C50,70 40,70 40,50;
                         M30,75 L30,40 Q30,25 35,25 Q40,20 45,25 Q50,20 55,25 Q60,25 60,40 L60,75;
                         M28,75 L28,35 Q28,20 35,20 Q42,15 45,20 Q48,15 55,20 Q62,20 62,35 L62,75;
                         M30,75 L30,40 Q30,25 35,25 Q40,20 45,25 Q50,20 55,25 Q60,25 60,40 L60,75;
                         M40,50 C40,30 30,30 30,50 C30,70 40,70 40,50 C40,30 50,30 50,50 C50,70 40,70 40,50;
                         M45,50 C45,25 25,25 25,50 C25,75 45,75 45,50 C45,25 65,25 65,50 C65,75 45,75 45,50"
                 dur="12s" 
                 repeatCount="indefinite"
                 calcMode="spline"
                 keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
                 keyTimes="0;0.15;0.35;0.5;0.65;0.85;1"/>
                 
        <animate attributeName="stroke-dashoffset"
                 values="0;-200;-400"
                 dur="3s"
                 repeatCount="indefinite"/>
                 
        <animate attributeName="stroke-width"
                 values="8;12;8"
                 dur="2s"
                 repeatCount="indefinite"/>
    </path>
    
    <text x="100" y="60" 
          font-family="Arial, sans-serif" 
          font-size="38" 
          font-weight="900" 
          letter-spacing="6"
          fill="url(#snakeGradient)"
          filter="url(#snakeGlow)">ATTIX</text>
</svg>`;

    const createStaticSVG = (
      text: string
    ): string => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="280" height="100" viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4facfe;stop-opacity:1" />
            <stop offset="25%" style="stop-color:#00f2fe;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="75%" style="stop-color:#764ba2;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f093fb;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
    <text x="140" y="60" 
          text-anchor="middle" 
          font-family="Arial, sans-serif" 
          font-size="38" 
          font-weight="900" 
          letter-spacing="6"
          fill="url(#textGradient)"
          filter="url(#glow)">${text}</text>
</svg>`;

    const animatedMorphingSVG = createAnimatedMorphingSVG();
    const infinityAttixSVG = createStaticSVG("∞ATTIX");
    const mattixSVG = createStaticSVG("MATTIX");
    const loadingSymbolSVG = createStaticSVG("∞");

    // Create ZIP file using JSZip library if available
    if (JSZip) {
      const zip = new JSZip();
      zip.file("animated-snake-morphing-logo.svg", animatedMorphingSVG);
      zip.file("infinity-attix-logo.svg", infinityAttixSVG);
      zip.file("mattix-logo.svg", mattixSVG);
      zip.file("loading-symbol.svg", loadingSymbolSVG);

      const generatePromise = zip.generateAsync({ type: "blob" });
      if (generatePromise && generatePromise.then) {
        generatePromise
          .then((content: Blob) => {
            try {
              const url = URL.createObjectURL(content);
              const a = document.createElement("a");
              a.href = url;
              a.download = "mattix-snake-brand-logos.zip";
              a.click();
              URL.revokeObjectURL(url);
            } catch (error) {
              console.error("Error creating download link:", error);
            }
          })
          .catch((error: Error) => {
            console.error("Error generating ZIP file:", error);
          });
      }
    } else {
      // Fallback: download files separately
      [
        {
          content: animatedMorphingSVG,
          filename: "animated-snake-morphing-logo.svg",
        },
        { content: infinityAttixSVG, filename: "infinity-attix-logo.svg" },
        { content: mattixSVG, filename: "mattix-logo.svg" },
        { content: loadingSymbolSVG, filename: "loading-symbol.svg" },
      ].forEach((download, index) => {
        setTimeout(() => {
          const blob = new Blob([download.content], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = download.filename;
          a.click();
          URL.revokeObjectURL(url);
        }, index * 500);
      });
    }
  };

  return (
    <div className={`download-manager ${className}`}>
      <button
        className="btn"
        onClick={downloadLoadingComponent}
        data-testid="download-component"
      >
        {type === "loading"
          ? "Download Loading Component"
          : "Download React Component"}
      </button>
      <button
        className="btn primary"
        onClick={downloadSVG}
        data-testid="download-svg"
      >
        Download Snake Brand Logos ZIP
      </button>
    </div>
  );
};
