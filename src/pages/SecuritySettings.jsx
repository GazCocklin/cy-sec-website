import React from 'react';
import { Navigate } from 'react-router-dom';

// This component is deprecated and now redirects to the new refactored settings page.
const DeprecatedSecuritySettings = () => {
  return <Navigate to="/fortify-one/settings" replace />;
};

export default DeprecatedSecuritySettings;