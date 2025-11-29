import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMidYMid meet">
    <rect width="90" height="200" fill="#FBF222"/>
    <rect x="110" width="90" height="213" fill="#F909A6"/>
    <rect y="220" width="200" height="80" fill="#0CF2F2"/>
  </svg>
);