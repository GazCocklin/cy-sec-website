import React from 'react';

const FortifyOneLogo = ({ height = 28, variant = 'dark' }) => {
  const width = Math.round(height * 430 / 80);
  const src = variant === 'light' ? '/logos/fortifyone-logo.svg' : '/logos/fortifyone-logo-dark.svg';
  return (
    <img src={src} alt="FortifyOne" width={width} height={height} style={{ display: 'block', objectFit: 'contain' }} />
  );
};

export default FortifyOneLogo;
