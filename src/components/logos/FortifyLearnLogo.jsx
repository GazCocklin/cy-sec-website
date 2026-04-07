import React from 'react';

const FortifyLearnLogo = ({ height = 28 }) => {
  const icon = height;
  const fs = Math.round(height * 0.52);
  const fortifyW = Math.round(fs * 3.74);
  const learnW  = Math.round(fs * 3.06);
  const W = icon + 8 + fortifyW + learnW;
  const textY = Math.round(height * 0.73);
  const gid = 'fl-lg';
  const tx = icon + 8 + fortifyW;
  return (
    <svg width={W} height={height} viewBox={`0 0 ${W} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1={tx} y1="0" x2={tx + learnW} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A56DB"/>
          <stop offset="100%" stopColor="#06B6D4"/>
        </linearGradient>
      </defs>
      <rect width={icon} height={icon} rx={Math.round(icon*0.22)} fill="#000"/>
      <g transform={`scale(${icon/256})`}>
        <path fill="white" d="M216 44H40a20 20 0 0 0-20 20v128a20 20 0 0 0 20 20h176a20 20 0 0 0 20-20V64a20 20 0 0 0-20-20Zm-4 144H44V68h168ZM72.5 150.63L100.79 128L72.5 105.37a12 12 0 1 1 15-18.74l40 32a12 12 0 0 1 0 18.74l-40 32a12 12 0 0 1-15-18.74ZM144 172h32a12 12 0 0 0 0-24h-32a12 12 0 0 0 0 24Z"/>
      </g>
      <text x={icon+8} y={textY} fontFamily="Inter,system-ui,sans-serif" fontSize={fs} fontWeight="700" fill="white">Fortify</text>
      <text x={tx} y={textY} fontFamily="Inter,system-ui,sans-serif" fontSize={fs} fontWeight="700" fill={`url(#${gid})`}>Learn</text>
    </svg>
  );
};
export default FortifyLearnLogo;
