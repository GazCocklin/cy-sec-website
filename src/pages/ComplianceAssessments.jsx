import React from 'react';
import { Navigate } from 'react-router-dom';

const ComplianceAssessmentsRedirect = () => {
  return <Navigate to="/fortify-one/compliance" replace />;
};

export default ComplianceAssessmentsRedirect;