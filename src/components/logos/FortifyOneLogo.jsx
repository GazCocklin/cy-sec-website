import React from 'react';
import { Shield } from 'lucide-react';

const FortifyOneLogo = ({ height = 28 }) => (
  <div className="flex items-center gap-2" style={{ height }}>
    <div className="rounded-lg flex items-center justify-center shrink-0"
      style={{ width: height, height, background: 'linear-gradient(135deg,#1E3A8A,#1A56DB)' }}>
      <Shield style={{ width: height * 0.5, height: height * 0.5 }} className="text-white" />
    </div>
    <span style={{ fontSize: height * 0.55, lineHeight: 1 }} className="font-semibold text-white">
      Fortify<span style={{ color: '#06B6D4', fontWeight: 300 }}>One</span>
    </span>
  </div>
);

export default FortifyOneLogo;
