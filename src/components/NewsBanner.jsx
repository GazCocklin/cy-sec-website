import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, ShieldCheck } from 'lucide-react';

const newsItems = [
  { icon: <Award className="h-5 w-5 text-yellow-400 mr-2" />, text: "Now an authorised CompTIA Training Partner, talk to us about your training needs." },
  { icon: <Award className="h-5 w-5 text-purple-400 mr-2" />, text: "Now an authorised CertNexus Partner!" },
  { icon: <Zap className="h-5 w-5 text-green-400 mr-2" />, text: "Introducing FortifyOne: All your cyber risk and compliance. One platform. Total control." },
  { icon: <Zap className="h-5 w-5 text-cyan-400 mr-2" />, text: "Get in touch to discuss AI-specific Risk Assessments." },
];

const NewsBanner = () => {
  const marqueeVariants = {
    animate: {
      x: ['0%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 80,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <div className="fixed top-20 left-0 right-0 z-40 bg-slate-800/80 backdrop-blur-sm border-b border-blue-500/20 overflow-hidden">
      <div className="relative h-10 flex items-center">
        <motion.div
          className="flex whitespace-nowrap"
          variants={marqueeVariants}
          animate="animate"
        >
          {newsItems.map((item, index) => (
            <div key={index} className="flex items-center text-sm text-gray-300 px-8 py-2">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
          {newsItems.map((item, index) => (
            <div key={`duplicate-${index}`} className="flex items-center text-sm text-gray-300 px-8 py-2" aria-hidden="true">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NewsBanner;