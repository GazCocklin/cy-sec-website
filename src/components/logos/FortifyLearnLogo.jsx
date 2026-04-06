import React from 'react';

const FortifyLearnLogo = ({ height = 28, className = '' }) => {
  const scale = height / 28;
  const w = Math.round(140 * scale);
  return (
    <svg width={w} height={height} viewBox="0 0 140 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Icon: terminal bracket */}
      <rect width="26" height="26" rx="6" y="1" fill="url(#fl-bg)"/>
      {/* > prompt */}
      <path d="M7 9.5L13 14L7 18.5" stroke="#E2EEF9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* _ cursor */}
      <rect x="15" y="17" width="5" height="2" rx="1" fill="#06B6D4"/>
      {/* Wordmark */}
      <text x="33" y="19" fontFamily="'Bricolage Grotesque', system-ui, sans-serif" fontWeight="800" fontSize="14" fill="#1A56DB" letterSpacing="-0.5">Fortify</text>
      <text x="85" y="19" fontFamily="'Bricolage Grotesque', system-ui, sans-serif" fontWeight="600" fontSize="14" fill="#64748B" letterSpacing="-0.3">Learn</text>
      <defs>
        <linearGradient id="fl-bg" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E3A8A"/>
          <stop offset="100%" stopColor="#1A56DB"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default FortifyLearnLogo;
