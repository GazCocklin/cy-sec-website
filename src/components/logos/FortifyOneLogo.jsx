import React from 'react';

const FortifyOneLogo = ({ height = 28, className = '' }) => {
  const scale = height / 28;
  const w = Math.round(132 * scale);
  return (
    <svg width={w} height={height} viewBox="0 0 132 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Icon: shield */}
      <rect width="26" height="26" rx="6" y="1" fill="url(#fo-bg)"/>
      {/* Shield outline */}
      <path d="M13 5.5L19.5 8.5V14C19.5 17.5 13 21.5 13 21.5C13 21.5 6.5 17.5 6.5 14V8.5L13 5.5Z" stroke="#E2EEF9" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      {/* Check inside shield */}
      <path d="M10 13.5L12.2 15.8L16 11.5" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Wordmark */}
      <text x="33" y="19" fontFamily="'Bricolage Grotesque', system-ui, sans-serif" fontWeight="800" fontSize="14" fill="#0E7490" letterSpacing="-0.5">Fortify</text>
      <text x="85" y="19" fontFamily="'Bricolage Grotesque', system-ui, sans-serif" fontWeight="600" fontSize="14" fill="#64748B" letterSpacing="-0.3">One</text>
      <defs>
        <linearGradient id="fo-bg" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0E7490"/>
          <stop offset="100%" stopColor="#06B6D4"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default FortifyOneLogo;
