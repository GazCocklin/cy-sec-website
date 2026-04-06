import React from 'react';
import { Helmet } from 'react-helmet';
import LandingPageHero from '@/components/LandingPageHero';
import ServicesGrid from '@/components/ServicesGrid';
import WhyCySecSection from '@/components/WhyCySecSection';
import StatsBar from '@/components/StatsBar';
import UrgencyBanner from '@/components/UrgencyBanner';
import BottomCTASection from '@/components/BottomCTASection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Cybersecurity Leadership, Compliance & Training | Cy-Sec</title>
        <meta name="description" content="Cy-Sec offers expert vCISO leadership, DORA & NIS2 compliance sprints, CompTIA certified training, and the all-in-one FortifyOne compliance platform for your organisation." />
      </Helmet>
      
      <LandingPageHero />
      <ServicesGrid />
      <WhyCySecSection />
      <StatsBar />
      <UrgencyBanner />
      <BottomCTASection />
    </div>
  );
};

export default HomePage;