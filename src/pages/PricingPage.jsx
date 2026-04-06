import React from 'react';
import { Helmet } from 'react-helmet';
import PricingPlans from '@/components/pricing/PricingPlans';

const PricingPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Pricing Plans - Cy-Sec Cybersecurity Solutions</title>
        <meta name="description" content="Flexible pricing plans for SMBs. Choose from monthly subscriptions or one-time assessments to fit your cybersecurity needs." />
      </Helmet>
      
      <PricingPlans />
    </div>
  );
};

export default PricingPage;