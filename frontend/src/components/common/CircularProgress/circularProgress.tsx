// Made by Thi Tran
// https://medium.com/tinyso/how-to-create-an-animated-svg-circular-progress-component-in-react-5123c7d24391

import React, { useEffect, useState } from "react";

interface CircularProgressInterface {
  size: number,
  strokeWidth: number,
  percentage: number,
  color: string
}

const CircularProgress = (props: CircularProgressInterface) => {
  const [progress, setProgress] = useState(0.0);
  useEffect(() => {
    setProgress(props.percentage);
  }, [props.percentage]);

  const viewBox = `0 0 ${props.size} ${props.size}`;
  const radius = (props.size - props.strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  return (
    <svg width={props.size} height={props.size} viewBox={viewBox}>
      <circle
        fill="none"
        stroke="#e5e5e5"
        cx={props.size / 2}
        cy={props.size / 2}
        r={radius}
        strokeWidth={`${props.strokeWidth}px`}
      />
      <circle
        fill="none"
        stroke={props.color}
        cx={props.size / 2}
        cy={props.size / 2}
        r={radius}
        strokeWidth={`${props.strokeWidth}px`}
        transform={`rotate(-90 ${props.size / 2} ${props.size / 2})`}
        strokeDasharray={[dash, circumference - dash].toString()}
        strokeLinecap="round"
        style={{ transition: "all 0.5s" }}
      />
      <text
        fill="black"
        fontWeight="500"
        fontSize="30px"
        x="50%"
        y="50%"
        dy="12.5px"
        textAnchor="middle"
      >
        {`${props.percentage}%`}
      </text>
    </svg>
  );
};

export default CircularProgress;