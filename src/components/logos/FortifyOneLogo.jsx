import React from 'react';

// FortifyOne — shield icon + wordmark
// Colours: #1A56DB primary, #06B6D4 teal — matches portfolio palette
const FortifyOneLogo = ({ height = 28, className = '' }) => {
  const scale = height / 28;
  const w = Math.round(136 * scale);
  return (
    <svg width={w} height={height} viewBox="0 0 136 28" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="fo-icon-bg" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E3A8A"/>
          <stop offset="100%" stopColor="#1A56DB"/>
        </linearGradient>
      </defs>
      {/* Icon */}
      <rect x="0" y="1" width="26" height="26" rx="6" fill="url(#fo-icon-bg)"/>
      {/* Shield outline */}
      <path d="M13 5.5L19.5 8.5V14C19.5 17.5 13 21.5 13 21.5C13 21.5 6.5 17.5 6.5 14V8.5L13 5.5Z"
        stroke="#E2EEF9" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      {/* Checkmark */}
      <path d="M10 13.5L12.2 15.8L16 11.5"
        stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Wordmark: Fortify bold + One teal */}
      <text x="33" y="20"
        fontFamily="'Inter',system-ui,sans-serif"
        fontWeight="800" fontSize="14" letterSpacing="-0.5" fill="#1A56DB">
        Fortify
      </text>
      <text x="89" y="20"
        fontFamily="'Inter',system-ui,sans-serif"
        fontWeight="400" fontSize="14" letterSpacing="-0.3" fill="#06B6D4">
        One
      </text>
    </svg>
  );
};

export default FortifyOneLogo;
