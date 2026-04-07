import React from 'react';

// FortifyOne logo — black square icon + "FortifyOne" wordmark
// No space between Fortify and One — single continuous wordmark
const FortifyOneLogo = ({ height = 28 }) => {
  const r = Math.round(height * 0.22);
  const fs = Math.round(height * 0.5);
  const hw = height / 2;
  const rad = hw * 0.7;
  const dot = hw * 0.17;
  const sat = hw * 0.56;
  const sw = Math.max(1.5, height * 0.055);
  const da = `${height * 0.09} ${height * 0.06}`;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(height * 0.3), height }}>
      {/* Black icon */}
      <svg width={height} height={height} viewBox={`0 0 ${height} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <rect width={height} height={height} rx={r} fill="#000000"/>
        <g transform={`translate(${hw},${hw})`}>
          <path d={`M ${sat} ${-sat} A ${rad} ${rad} 0 1 1 ${-sat} ${sat}`} fill="none" stroke="white" strokeWidth={sw} strokeLinecap="round"/>
          <path d={`M ${-sat} ${sat} A ${rad} ${rad} 0 0 1 ${sat} ${-sat}`} fill="none" stroke="white" strokeWidth={sw} strokeLinecap="round" strokeDasharray={da}/>
          <circle cx="0" cy="0" r={dot*1.6} fill="white"/>
          <circle cx={sat} cy={-sat} r={dot*1.3} fill="white"/>
          <circle cx={-sat} cy={sat} r={dot*1.3} fill="white"/>
        </g>
      </svg>
      {/* Wordmark — no space */}
      <span style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: fs, fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>
        Fortify<span style={{ fontWeight: 300, color: '#06B6D4' }}>One</span>
      </span>
    </span>
  );
};

export default FortifyOneLogo;
