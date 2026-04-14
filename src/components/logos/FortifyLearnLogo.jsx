import React from 'react';

const FortifyLearnLogo = ({ height = 28, variant = 'dark' }) => {
  const width = Math.round(height * 470 / 80);
  const src = variant === 'light' ? '/logos/fortifylearn-logo.svg' : '/logos/fortifylearn-logo-dark.svg';
  return (
    <img src={src} alt="FortifyLearn" width={width} height={height} style={{ display: 'block', objectFit: 'contain' }} />
  );
};

export default FortifyLearnLogo;
