// Type definitions for the DOM utilities
declare global {
  interface Window {
    JSZip: any;
  }
}

// Utility functions with proper typing
export function showStaticVersion(): void {
  const element = document.getElementById("staticVersion");
  if (element) {
    element.style.display = "flex";
  }
}

export function hideStaticVersion(): void {
  const element = document.getElementById("staticVersion");
  if (element) {
    element.style.display = "none";
  }
}

export async function copyLoadingCode(): Promise<void> {
  const code = `const InfinityLoader = () => (
  <div style={{
    fontSize: '48px',
    fontWeight: 900,
    background: 'linear-gradient(45deg, #4facfe 0%, #667eea 50%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 0 10px rgba(79, 172, 254, 0.5))'
  }}>
    ∞
  </div>
);`;

  try {
    await navigator.clipboard.writeText(code);
    const element = document.getElementById("codePreview");
    if (element) {
      element.style.display = "block";
      setTimeout(() => {
        element.style.display = "none";
      }, 3000);
    }
  } catch (error) {
    console.error("Failed to copy code:", error);
  }
}

export function downloadLoadingComponent(): void {
  const componentCode = `import React from 'react';

export interface MattixLogoProps {
  animated?: boolean;
  size?: number;
  className?: string;
}

export interface InfinityLoaderProps {
  size?: number;
  className?: string;
}

const MattixLogo: React.FC<MattixLogoProps> = ({ animated = true, size = 280 }) => {
  if (animated) {
    return (
      <svg width={size} height={size * 0.36} viewBox="0 0 280 100">
        <defs>
          <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: '#00f2fe', stopOpacity: 0.6}} />
            <stop offset="30%" style={{stopColor: '#4facfe', stopOpacity: 0.9}} />
            <stop offset="50%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
            <stop offset="70%" style={{stopColor: '#667eea', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 0.6}} />
          </linearGradient>
          <filter id="snakeGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
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
                   repeatCount="indefinite"/>
                   
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
              fontFamily="Arial, sans-serif" 
              fontSize="38" 
              fontWeight="900" 
              letterSpacing="6"
              fill="url(#snakeGradient)"
              filter="url(#snakeGlow)">ATTIX</text>
      </svg>
    );
  }

  return (
    <div style={{
      fontSize: size * 0.17 + 'px',
      fontWeight: 900,
      background: 'linear-gradient(45deg, #4facfe 0%, #667eea 50%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      filter: 'drop-shadow(0 0 10px rgba(79, 172, 254, 0.5))'
    }}>
      ∞ATTIX
    </div>
  );
};

const InfinityLoader: React.FC<InfinityLoaderProps> = ({ size = 48 }) => (
  <div style={{
    fontSize: size + 'px',
    fontWeight: 900,
    background: 'linear-gradient(45deg, #4facfe 0%, #667eea 50%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 0 10px rgba(79, 172, 254, 0.5))',
    animation: 'loadingPulse 2s ease-in-out infinite'
  }}>
    ∞
  </div>
);

export { MattixLogo, InfinityLoader };
export default MattixLogo;`;

  const blob = new Blob([componentCode], { type: "text/typescript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "MattixLogo.tsx";
  a.click();
  URL.revokeObjectURL(url);
}

// SVG template generators with proper typing
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

export function downloadSVG(): void {
  const animatedMorphingSVG = createAnimatedMorphingSVG();
  const infinityAttixSVG = createStaticSVG("∞ATTIX");
  const mattixSVG = createStaticSVG("MATTIX");
  const loadingSymbolSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4facfe;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
    <text x="30" y="40" 
          text-anchor="middle" 
          font-family="Arial, sans-serif" 
          font-size="48" 
          font-weight="900"
          fill="url(#loadingGradient)"
          filter="url(#glow)">∞</text>
</svg>`;

  // Create ZIP file using JSZip library
  if (typeof window !== "undefined" && window.JSZip) {
    const zip = new window.JSZip();
    zip.file("animated-snake-morphing-logo.svg", animatedMorphingSVG);
    zip.file("infinity-attix-logo.svg", infinityAttixSVG);
    zip.file("mattix-logo.svg", mattixSVG);
    zip.file("loading-symbol.svg", loadingSymbolSVG);

    zip.generateAsync({ type: "blob" }).then((content: Blob) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mattix-snake-brand-logos.zip";
      a.click();
      URL.revokeObjectURL(url);
    });
  } else {
    // Fallback: download files separately
    downloadSeparateFiles(
      animatedMorphingSVG,
      infinityAttixSVG,
      mattixSVG,
      loadingSymbolSVG
    );
  }
}

function downloadSeparateFiles(
  animatedSVG: string,
  infinityAttixSVG: string,
  mattixSVG: string,
  loadingSVG: string
): void {
  const downloads = [
    { content: animatedSVG, filename: "animated-snake-morphing-logo.svg" },
    { content: infinityAttixSVG, filename: "infinity-attix-logo.svg" },
    { content: mattixSVG, filename: "mattix-logo.svg" },
    { content: loadingSVG, filename: "loading-symbol.svg" },
  ];

  downloads.forEach((download, index) => {
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

// Make functions available globally for HTML onclick handlers
if (typeof window !== "undefined") {
  (window as any).showStaticVersion = showStaticVersion;
  (window as any).hideStaticVersion = hideStaticVersion;
  (window as any).copyLoadingCode = copyLoadingCode;
  (window as any).downloadLoadingComponent = downloadLoadingComponent;
  (window as any).downloadSVG = downloadSVG;
}
