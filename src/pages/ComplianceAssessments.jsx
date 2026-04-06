import React from 'react';
import { Navigate } from 'react-router-dom';

const ComplianceAssessmentsRedirect = () => {
  return <Navigate to="/security-suite/compliance" replace />;
};

export default ComplianceAssessmentsRedirect;