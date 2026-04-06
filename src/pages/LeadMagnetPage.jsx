import React from 'react';
import { Helmet } from 'react-helmet';
import LeadMagnet from '@/components/sales/LeadMagnet';

const LeadMagnetPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Free Cybersecurity Resources - Cy-Sec</title>
        <meta name="description" content="Download our comprehensive cybersecurity toolkit for free. Get GDPR compliance templates, ISO 27001 guides, and security assessment tools." />
      </Helmet>
      
      <LeadMagnet />
    </div>
  );
};

export default LeadMagnetPage;