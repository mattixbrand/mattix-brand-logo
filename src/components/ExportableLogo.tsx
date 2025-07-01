import React from "react";

interface ExportableLogoProps {
  size?: number;
  variant?: "default" | "static" | "mono" | "inverse";
  backgroundColor?: string;
  className?: string;
  logoType?: "full" | "symbol" | "text"; // New prop for logo type
  textVariant?: "MATTIX" | "∞ATTIX"; // New prop for text variant
}

export const ExportableLogo: React.FC<ExportableLogoProps> = ({
  size = 256,
  variant = "default",
  backgroundColor = "transparent",
  className = "",
  logoType = "full",
  textVariant = "MATTIX",
}) => {
  // Color schemes based on variant
  const getColors = () => {
    switch (variant) {
      case "mono":
        return {
          primary: "#000000",
          secondary: "#333333",
          text: "#000000",
        };
      case "inverse":
        return {
          primary: "#ffffff",
          secondary: "#f0f0f0",
          text: "#ffffff",
        };
      default:
        return {
          primary: "#4facfe", // From StaticVersionModal gradient
          secondary: "#667eea", // From StaticVersionModal gradient
          tertiary: "#764ba2", // From StaticVersionModal gradient
          text: "#4facfe",
        };
    }
  };

  const colors = getColors();
  const isAnimated = variant === "default";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        backgroundColor:
          backgroundColor === "transparent" ? undefined : backgroundColor,
      }}
    >
      {/* Background */}
      {backgroundColor !== "transparent" && (
        <rect width="400" height="400" fill={backgroundColor} />
      )}

      {/* Definitions for gradients and filters */}
      <defs>
        <linearGradient
          id="primaryGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="50%" stopColor={colors.secondary} />
          <stop offset="100%" stopColor={colors.tertiary || colors.primary} />
        </linearGradient>

        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.text} />
          <stop offset="100%" stopColor={colors.primary} />
        </linearGradient>

        {/* Glow filter for enhanced effects - matching StaticVersionModal */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Drop shadow filter matching StaticVersionModal */}
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="10"
            floodColor="#4facfe"
            floodOpacity="0.5"
          />
        </filter>

        {/* Drop shadow filter matching StaticVersionModal */}
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="10"
            floodColor="#4facfe"
            floodOpacity="0.5"
          />
        </filter>

        {/* Animation definitions */}
        {isAnimated && (
          <>
            <animateTransform
              id="morphAnimation"
              attributeName="transform"
              type="rotate"
              values="0 200 150;360 200 150"
              dur="4s"
              repeatCount="indefinite"
            />
          </>
        )}
      </defs>

      {/* Infinity Symbol */}
      {(logoType === "full" || logoType === "symbol") && (
        <>
          {logoType === "symbol" ? (
            // Simple Unicode infinity symbol matching StaticVersionModal styling
            <text
              x="200"
              y="200"
              textAnchor="middle"
              fill="url(#primaryGradient)"
              fontSize="140"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              filter="url(#dropShadow)"
            >
              ∞
              {isAnimated && (
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </text>
          ) : (
            // Complex SVG path for full logos
            <g transform="translate(200, 150)">
              <path
                d="M -80,0 C -80,-40 -40,-40 -40,0 C -40,40 -80,40 -80,0 M 40,0 C 40,-40 80,-40 80,0 C 80,40 40,40 40,0"
                fill="none"
                stroke="url(#primaryGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={isAnimated ? "url(#glow)" : undefined}
              >
                {isAnimated && (
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 0 0;360 0 0"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                )}
              </path>

              {/* Morphing effect overlay */}
              {isAnimated && (
                <path
                  d="M -60,-20 L -20,-20 L -20,20 L -60,20 Z
                   M 20,-20 L 60,-20 L 60,20 L 20,20 Z"
                  fill="url(#primaryGradient)"
                  opacity="0.3"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0.6;0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>
              )}
            </g>
          )}
        </>
      )}

      {/* Brand Text */}
      {(logoType === "full" || logoType === "text") && (
        <text
          x="200"
          y={logoType === "text" ? "200" : "280"}
          textAnchor="middle"
          fill="url(#textGradient)"
          fontSize={logoType === "text" ? "48" : "32"}
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          filter={isAnimated ? "url(#glow)" : undefined}
        >
          {textVariant}
          {isAnimated && (
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
        </text>
      )}

      {/* Subtle particles for enhanced effect */}
      {isAnimated && (
        <g opacity="0.4">
          <circle cx="150" cy="120" r="2" fill={colors.secondary}>
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>
          <circle cx="250" cy="180" r="1.5" fill={colors.secondary}>
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2.5s"
              repeatCount="indefinite"
              begin="0.5s"
            />
          </circle>
          <circle cx="120" cy="200" r="1" fill={colors.primary}>
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="3s"
              repeatCount="indefinite"
              begin="1s"
            />
          </circle>
          <circle cx="280" cy="140" r="1.5" fill={colors.primary}>
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2.2s"
              repeatCount="indefinite"
              begin="1.5s"
            />
          </circle>
        </g>
      )}

      {/* Brand mark for static versions */}
      {!isAnimated && (
        <circle cx="200" cy="320" r="3" fill={colors.primary} opacity="0.6" />
      )}
    </svg>
  );
};

// Utility function to convert SVG to different formats
export const svgToDataURL = (svgElement: SVGElement): string => {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};

// Function to render SVG to Canvas for PNG export
export const renderSVGToCanvas = (
  svgString: string,
  size: number
): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      resolve(canvas);
    };
    img.onerror = reject;

    const blob = new Blob([svgString], { type: "image/svg+xml" });
    img.src = URL.createObjectURL(blob);
  });
};

export default ExportableLogo;
