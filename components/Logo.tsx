import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMidYMid meet">
    <g transform="translate(10, 10)">
        {/* Blocky K */}
        <path d="M10 10 V90 H30 V60 L50 90 H80 L50 50 L80 10 H50 L30 40 V10 H10Z" 
              fill="rgb(15, 195, 255)" 
              stroke="rgb(255, 255, 54)" 
              strokeWidth="4" 
              strokeLinejoin="round"
        />
        {/* Blocky H integrated/overlay style simplified for icon */}
        <path d="M60 10 V90 H80 V60 H90 V10 H60Z" 
              fill="rgb(15, 195, 255)" 
              stroke="rgb(255, 255, 54)" 
              strokeWidth="4"
              opacity="0.9"
        />
    </g>
  </svg>
);