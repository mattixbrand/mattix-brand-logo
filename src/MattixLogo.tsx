import React from "react";

export interface MattixLogoProps {
  animated?: boolean;
  size?: number;
  className?: string;
  "data-testid"?: string;
}

export interface InfinityLoaderProps {
  size?: number;
  className?: string;
  "data-testid"?: string;
}

const MattixLogo: React.FC<MattixLogoProps> = ({
  animated = true,
  size = 280,
  className = "",
  "data-testid": testId,
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
            <stop
              offset="0%"
              style={{ stopColor: "#00f2fe", stopOpacity: 0.6 }}
            />
            <stop
              offset="30%"
              style={{ stopColor: "#4facfe", stopOpacity: 0.9 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#ffffff", stopOpacity: 1 }}
            />
            <stop
              offset="70%"
              style={{ stopColor: "#667eea", stopOpacity: 0.9 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#764ba2", stopOpacity: 0.6 }}
            />
          </linearGradient>
          <filter id="snakeGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Unified Snake Path */}
        <path
          fill="none"
          stroke="url(#snakeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#snakeGlow)"
          strokeDasharray="40 160"
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

  // Static version
  return (
    <div
      style={{
        fontSize: size * 0.17 + "px",
        fontWeight: 900,
        background:
          "linear-gradient(45deg, #4facfe 0%, #667eea 50%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 0 10px rgba(79, 172, 254, 0.5))",
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
  className = "",
  "data-testid": testId,
}) => (
  <div
    style={{
      fontSize: size + "px",
      fontWeight: 900,
      background:
        "linear-gradient(45deg, #4facfe 0%, #667eea 50%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 10px rgba(79, 172, 254, 0.5))",
      animation: "loadingPulse 2s ease-in-out infinite",
    }}
    className={className}
    data-testid={testId}
  >
    ∞
  </div>
);

export { MattixLogo, InfinityLoader };
export default MattixLogo;
