import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Flag, Rocket, Target, Calendar } from 'lucide-react';

const StrategicRoadmap = () => {
  const roadmapPhases = [
    {
      quarter: 'Q3 2025',
      title: 'Foundation & Core Product Launch',
      icon: <Flag className="h-6 w-6 text-white" />,
      bgColor: 'bg-blue-500',
      items: [
        'Launch MVP of FortifyOne Platform',
        'Onboard first 10 enterprise clients',
        'Establish core marketing channels',
        'Finalize Tier 1 compliance framework support',
      ],
    },
    {
      quarter: 'Q4 2025',
      title: 'Expansion & Feature Enhancement',
      icon: <Rocket className="h-6 w-6 text-white" />,
      bgColor: 'bg-purple-500',
      items: [
        'Introduce Vendor Risk Management module',
        'Develop advanced reporting and analytics',
        'Integrate with 2 major security partners',
        'Expand sales team and enter new market segment',
      ],
    },
    {
      quarter: 'Q1 2026',
      title: 'Scale & Automation',
      icon: <Target className="h-6 w-6 text-white" />,
      bgColor: 'bg-green-500',
      items: [
        'Launch automated evidence collection',
        'Introduce AI-powered risk scoring',
        'Achieve ISO 27001 certification for Cy-Sec',
        'Host first annual user conference',
      ],
    },
    {
      quarter: 'Q2 2026',
      title: 'Market Leadership & Innovation',
      icon: <Calendar className="h-6 w-6 text-white" />,
      bgColor: 'bg-orange-500',
      items: [
        'Explore predictive threat intelligence features',
        'Launch public API for custom integrations',
        'Establish international presence in EMEA',
        'Begin R&D for next-generation GRC platform',
      ],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <Helmet>
        <title>Strategic Roadmap - Cy-Sec Admin</title>
        <meta name="description" content="Cy-Sec strategic product and company roadmap." />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Map className="h-16 w-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">Strategic Roadmap</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Our vision for the future of Cy-Sec, outlining key initiatives and milestones for product growth and market expansion.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-slate-200 hidden md:block" aria-hidden="true"></div>
          
          {roadmapPhases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`mb-12 flex md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="hidden md:block w-1/2"></div>
              <div className="hidden md:block relative w-1/2">
                <div className={`absolute top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center ${phase.bgColor} ring-8 ring-slate-50 ${index % 2 === 0 ? '-right-4' : '-left-4'}`}>
                  {phase.icon}
                </div>
              </div>

              <Card className={`w-full md:w-1/2 shadow-lg border-t-4 ${phase.bgColor.replace('bg-', 'border-')}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-slate-800">{phase.title}</CardTitle>
                    <span className={`font-bold text-lg ${phase.bgColor.replace('bg-', 'text-')}`}>{phase.quarter}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 list-disc list-inside text-slate-700">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategicRoadmap;