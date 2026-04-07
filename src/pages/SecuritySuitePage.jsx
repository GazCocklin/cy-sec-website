import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import ComparisonTable from '@/components/security-suite/ComparisonTable';
import SecuritySuiteHero from '@/components/security-suite/sections/SecuritySuiteHero';
import HolisticRiskOverviewSection from '@/components/security-suite/sections/HolisticRiskOverviewSection';
import WhyChoosePlatformSection from '@/components/security-suite/sections/WhyChoosePlatformSection';
import FrameworkVendorSupportSection from '@/components/security-suite/sections/FrameworkVendorSupportSection';
import ClearActionableReportingSection from '@/components/security-suite/sections/ClearActionableReportingSection';
import DetailedReportsSection from '@/components/security-suite/sections/DetailedReportsSection';
import ProgressTrackingSection from '@/components/security-suite/sections/ProgressTrackingSection';
import SecuritySuiteCTA from '@/components/security-suite/sections/SecuritySuiteCTA';

const SecuritySuitePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact');
  };

  const handleExplorePlans = () => {
    navigate('/pricing');
  };

  const handleContactUsFramework = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>ISO 27001 & DORA Compliance Platform UK | FortifyOne by Cy-Sec</title>
        <meta name="description" content="FortifyOne is Cy-Sec's GRC platform for UK businesses. Automate ISO 27001, NIST CSF 2.0, DORA, NIS2 and PCI-DSS compliance. Includes vendor risk management, AI risk assessments, and security maturity scoring." />
      </Helmet>

      <SecuritySuiteHero handleGetStarted={handleGetStarted} handleExplorePlans={handleExplorePlans} />
      <HolisticRiskOverviewSection />
      <WhyChoosePlatformSection />
      <FrameworkVendorSupportSection handleContactUsFramework={handleContactUsFramework} />
      <ClearActionableReportingSection handleExplorePlans={handleExplorePlans} />
      <DetailedReportsSection />
      <ProgressTrackingSection />
      <ComparisonTable />
      <SecuritySuiteCTA handleGetStarted={handleGetStarted} />

    </div>
  );
};

export default SecuritySuitePage;