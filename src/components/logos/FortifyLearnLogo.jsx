import React from 'react';

const FortifyLearnLogo = ({ height = 28 }) => {
  // Width calculated from SVG aspect ratio (470:80)
  const width = Math.round(height * 470 / 80);
  return (
    <img
      src="/logos/fortifylearn-logo-dark.svg"
      alt="FortifyLearn"
      width={width}
      height={height}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  );
};

export default FortifyLearnLogo;
