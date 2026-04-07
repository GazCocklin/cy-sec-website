import React from 'react';

const FortifyOneLogo = ({ height = 28 }) => {
  // Width calculated from SVG aspect ratio (430:80)
  const width = Math.round(height * 430 / 80);
  return (
    <img
      src="/logos/fortifyone-logo-dark.svg"
      alt="FortifyOne"
      width={width}
      height={height}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  );
};

export default FortifyOneLogo;
