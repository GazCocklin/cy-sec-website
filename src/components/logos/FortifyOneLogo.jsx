import React from 'react';

const FortifyOneLogo = ({ height = 28 }) => {
  const icon = height;
  const fontSize = Math.round(height * 0.52);
  const totalW = icon + 8 + Math.round(fontSize * 5.6);
  return (
    <svg width={totalW} height={height} viewBox={`0 0 ${totalW} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Black icon square */}
      <rect width={icon} height={icon} rx={Math.round(icon * 0.22)} fill="#000000"/>
      {/* Orbit icon — centred in black square */}
      <g transform={`translate(${icon/2}, ${icon/2})`}>
        <path d={`M ${icon*0.3} ${-icon*0.3} A ${icon*0.38} ${icon*0.38} 0 1 1 ${-icon*0.3} ${icon*0.3}`}
          fill="none" stroke="white" strokeWidth={Math.max(1.5, icon*0.055)} strokeLinecap="round"/>
        <path d={`M ${-icon*0.3} ${icon*0.3} A ${icon*0.38} ${icon*0.38} 0 0 1 ${icon*0.3} ${-icon*0.3}`}
          fill="none" stroke="white" strokeWidth={Math.max(1.5, icon*0.055)} strokeLinecap="round" strokeDasharray={`${icon*0.09} ${icon*0.06}`}/>
        <circle cx="0" cy="0" r={icon*0.09} fill="white"/>
        <circle cx={icon*0.3} cy={-icon*0.3} r={icon*0.07} fill="white"/>
        <circle cx={-icon*0.3} cy={icon*0.3} r={icon*0.07} fill="white"/>
      </g>
      {/* Wordmark */}
      <text x={icon + 8} y={Math.round(height * 0.73)}
        fontFamily="Inter,system-ui,sans-serif"
        fontSize={fontSize} fontWeight="700" fill="white">Fortify</text>
      <text x={icon + 8 + Math.round(fontSize * 3.72)} y={Math.round(height * 0.73)}
        fontFamily="Inter,system-ui,sans-serif"
        fontSize={fontSize} fontWeight="300" fill="#06B6D4">One</text>
    </svg>
  );
};

export default FortifyOneLogo;
