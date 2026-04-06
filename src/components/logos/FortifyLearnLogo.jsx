import React from 'react';

// FortifyLearn — terminal icon + wordmark
// Colours: #1A56DB primary, #06B6D4 teal — matches FL dashboard hero palette
const FortifyLearnLogo = ({ height = 28, className = '' }) => {
  const scale = height / 28;
  const w = Math.round(148 * scale);
  return (
    <svg width={w} height={height} viewBox="0 0 148 28" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="fl-icon-bg" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E3A8A"/>
          <stop offset="100%" stopColor="#1A56DB"/>
        </linearGradient>
      </defs>
      {/* Icon */}
      <rect x="0" y="1" width="26" height="26" rx="6" fill="url(#fl-icon-bg)"/>
      {/* > prompt */}
      <path d="M7 9L13 14L7 19" stroke="#E2EEF9" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"/>
      {/* _ cursor */}
      <rect x="15" y="17.5" width="5" height="2" rx="1" fill="#06B6D4"/>
      {/* Wordmark: Fortify bold + Learn regular */}
      <text x="33" y="20"
        fontFamily="'Inter',system-ui,sans-serif"
        fontWeight="800" fontSize="14" letterSpacing="-0.5" fill="#1A56DB">
        Fortify
      </text>
      <text x="89" y="20"
        fontFamily="'Inter',system-ui,sans-serif"
        fontWeight="400" fontSize="14" letterSpacing="-0.3" fill="#06B6D4">
        Learn
      </text>
    </svg>
  );
};

export default FortifyLearnLogo;
