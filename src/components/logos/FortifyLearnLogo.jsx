import React from 'react';

const FortifyLearnLogo = ({ height = 28 }) => {
  const icon = height;
  const fontSize = Math.round(height * 0.52);
  const totalW = icon + 8 + Math.round(fontSize * 6.4);
  return (
    <svg width={totalW} height={height} viewBox={`0 0 ${totalW} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Black icon square */}
      <rect width={icon} height={icon} rx={Math.round(icon * 0.22)} fill="#000000"/>
      {/* Terminal window bold (Phosphor) scaled to icon size */}
      <g transform={`scale(${icon / 256})`}>
        <path fill="white" d="M216 44H40a20 20 0 0 0-20 20v128a20 20 0 0 0 20 20h176a20 20 0 0 0 20-20V64a20 20 0 0 0-20-20Zm-4 144H44V68h168ZM72.5 150.63L100.79 128L72.5 105.37a12 12 0 1 1 15-18.74l40 32a12 12 0 0 1 0 18.74l-40 32a12 12 0 0 1-15-18.74ZM144 172h32a12 12 0 0 0 0-24h-32a12 12 0 0 0 0 24Z"/>
      </g>
      {/* Wordmark */}
      <text x={icon + 8} y={Math.round(height * 0.73)}
        fontFamily="Inter,system-ui,sans-serif"
        fontSize={fontSize} fontWeight="700" fill="white">Fortify</text>
      <text x={icon + 8 + Math.round(fontSize * 3.72)} y={Math.round(height * 0.73)}
        fontFamily="Inter,system-ui,sans-serif"
        fontSize={fontSize} fontWeight="300" fill="#06B6D4">Learn</text>
    </svg>
  );
};

export default FortifyLearnLogo;
