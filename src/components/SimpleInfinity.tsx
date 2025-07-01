import React from "react";

interface SimpleInfinityProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export const SimpleInfinity: React.FC<SimpleInfinityProps> = ({
  size = 64,
  color = "#007acc",
  strokeWidth = 4,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M25,50 
           C25,30 35,20 45,20 
           C55,20 55,30 55,30
           C55,30 55,20 65,20
           C75,20 85,30 85,50
           C85,70 75,80 65,80
           C55,80 55,70 55,70
           C55,70 55,80 45,80
           C35,80 25,70 25,50 Z"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SimpleInfinity;
