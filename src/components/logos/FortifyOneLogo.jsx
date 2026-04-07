import React from 'react';

const FortifyOneLogo = ({ height = 28 }) => {
  const icon = height;
  const fs = Math.round(height * 0.52);
  const fortifyW = Math.round(fs * 3.74);
  const oneW    = Math.round(fs * 1.82);
  const W = icon + 8 + fortifyW + oneW;
  const textY = Math.round(height * 0.73);
  const gid = 'fo-lg';
  const tx = icon + 8 + fortifyW;
  return (
    <svg width={W} height={height} viewBox={`0 0 ${W} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1={tx} y1="0" x2={tx + oneW} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A56DB"/>
          <stop offset="100%" stopColor="#06B6D4"/>
        </linearGradient>
      </defs>
      <rect width={icon} height={icon} rx={Math.round(icon*0.22)} fill="#000"/>
      <g transform={`translate(${icon/2},${icon/2})`}>
        <path d={`M ${icon*.3} ${-icon*.3} A ${icon*.38} ${icon*.38} 0 1 1 ${-icon*.3} ${icon*.3}`} fill="none" stroke="white" strokeWidth={Math.max(1.4,icon*.052)} strokeLinecap="round"/>
        <path d={`M ${-icon*.3} ${icon*.3} A ${icon*.38} ${icon*.38} 0 0 1 ${icon*.3} ${-icon*.3}`} fill="none" stroke="white" strokeWidth={Math.max(1.4,icon*.052)} strokeLinecap="round" strokeDasharray={`${icon*.09} ${icon*.06}`}/>
        <circle cx="0" cy="0" r={icon*.09} fill="white"/>
        <circle cx={icon*.3} cy={-icon*.3} r={icon*.065} fill="white"/>
        <circle cx={-icon*.3} cy={icon*.3} r={icon*.065} fill="white"/>
      </g>
      <text x={icon+8} y={textY} fontFamily="Inter,system-ui,sans-serif" fontSize={fs} fontWeight="700" fill="white">Fortify</text>
      <text x={tx} y={textY} fontFamily="Inter,system-ui,sans-serif" fontSize={fs} fontWeight="700" fill={`url(#${gid})`}>One</text>
    </svg>
  );
};
export default FortifyOneLogo;
