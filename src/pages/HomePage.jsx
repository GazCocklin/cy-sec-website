import React from 'react';
import { Helmet } from 'react-helmet';
import HeroFortifyLearn from '@/components/HeroFortifyLearn';
import ProofStripFL from '@/components/ProofStripFL';
import ExamPrepSection from '@/components/ExamPrepSection';
import ConsultancyBand from '@/components/ConsultancyBand';

// Navbar + Footer are rendered globally in App.jsx — do NOT add them here.
const HomePage = () => (
  <div className="min-h-screen">
    <Helmet>
      <title>Cybersecurity Leadership, Compliance & Training | Cy-Sec</title>
      <meta name="description" content="vCISO leadership, DORA & NIS2 compliance sprints, CompTIA certified training, and the FortifyOne compliance platform. One trusted partner." />
    </Helmet>
    <HeroFortifyLearn />
    <ProofStripFL />
    <ExamPrepSection cert="secplus" certLabel="Security+" code="SY0-701" />
    <ConsultancyBand />
  </div>
);

export default HomePage;
