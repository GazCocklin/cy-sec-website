import React from 'react';

// FortifyLearn logo — black square icon + "FortifyLearn" wordmark
// No space between Fortify and Learn — single continuous wordmark
const FortifyLearnLogo = ({ height = 28 }) => {
  const r = Math.round(height * 0.22);
  const fs = Math.round(height * 0.5);
  // icon is square, same as height
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(height * 0.3), height }}>
      {/* Black icon */}
      <svg width={height} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <rect width="48" height="48" rx={r} fill="#000000"/>
        {/* Terminal window bold — Phosphor, scaled to 48px canvas */}
        <path fill="white" d="M40.5 8.25H7.5A3.75 3.75 0 0 0 3.75 12v24A3.75 3.75 0 0 0 7.5 39.75h33A3.75 3.75 0 0 0 44.25 36V12A3.75 3.75 0 0 0 40.5 8.25Zm-.75 27H8.25V12.75h31.5ZM13.59 28.24L18.9 24l-5.31-4.24a2.25 2.25 0 1 1 2.82-3.52l7.5 6a2.25 2.25 0 0 1 0 3.52l-7.5 6a2.25 2.25 0 0 1-2.82-3.52ZM27 32.25h6a2.25 2.25 0 0 0 0-4.5h-6a2.25 2.25 0 0 0 0 4.5Z"/>
      </svg>
      {/* Wordmark — no space */}
      <span style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: fs, fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>
        Fortify<span style={{ fontWeight: 300, color: '#06B6D4' }}>Learn</span>
      </span>
    </span>
  );
};

export default FortifyLearnLogo;
