import React, { useEffect, useState } from "react";

const ProgressCircle = ({ progress }) => {
  const [offset, setOffset] = useState(0);
  const circumference = 2 * Math.PI * 35;

  useEffect(() => {
    const normalizedProgress = Math.min(Math.max(progress, 0), 100);
    const dashOffset =
      circumference - (circumference * normalizedProgress) / 100;

    setOffset(dashOffset);
  }, [progress, circumference]);

  return (
    <svg
      className="progress-circle"
      width="100"
      height="100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="box-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
          <feGaussianBlur
            result="blurOut"
            in="offOut"
            stdDeviation="1.5"
          />{" "}
          {/* Adjusted stdDeviation for a smaller glow */}
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <circle
        className="progress-circle-background"
        cx="50"
        cy="50"
        r="35"
        fill="none"
        strokeWidth="8"
      />
      <circle
        className="progress-circle-bar"
        cx="50"
        cy="50"
        r="35"
        fill="none"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
        filter="url(#box-shadow)"
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dy="7"
        fontSize="16"
        fill="#8a82a9"
      >
        {`${progress}%`}
      </text>
    </svg>
  );
};

export default ProgressCircle;
