import React from 'react';
import { Helmet } from 'react-helmet';
import LandingPageHero from '@/components/LandingPageHero';
import ServicesGrid from '@/components/ServicesGrid';
import WhyCySecSection from '@/components/WhyCySecSection';
import PlatformsShowcase from '@/components/PlatformsShowcase';
import BottomCTASection from '@/components/BottomCTASection';

const HomePage = () => (
  <div className="min-h-screen">
    <Helmet>
      <title>Cybersecurity Leadership, Compliance & Training | Cy-Sec</title>
      <meta name="description" content="vCISO leadership, DORA & NIS2 compliance sprints, CompTIA certified training, and the FortifyOne compliance platform. One trusted partner." />
    </Helmet>
    <LandingPageHero />
    <ServicesGrid />
    <WhyCySecSection />
    <PlatformsShowcase />
    <BottomCTASection />
  </div>
);

export default HomePage;
