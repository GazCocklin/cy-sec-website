import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays } from 'lucide-react';

const PackageCard = ({ pkg, index, handleContactUs }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="feature-card-border rounded-xl p-8 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group flex flex-col shadow-lg"
    >
      <div className="flex justify-between items-start mb-4">
        <pkg.icon className="h-12 w-12 text-blue-600 group-hover:text-cyan-600 transition-colors" />
        {pkg.logoUrls && pkg.logoUrls.length > 0 && (
          <div className="flex space-x-2">
            {pkg.logoUrls.map((logoUrl, logoIndex) => (
              <img 
                key={logoIndex} 
                src={logoUrl} 
                alt={`${pkg.title} logo ${logoIndex + 1}`} 
                className="h-16 w-auto object-contain rounded-md bg-white p-1" 
              />
            ))}
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-slate-800">{pkg.title}</h3>
      {pkg.price && (
        <p className="text-xl font-semibold gradient-text mb-4">{pkg.price}</p>
      )}
      <ul className="space-y-2 mb-6 text-slate-600 text-sm flex-grow">
        {pkg.modules.map((module, idx) => (
          <li key={idx} className="flex">
            <CalendarDays className="h-4 w-4 text-cyan-600 mr-2 mt-1 flex-shrink-0" />
            <span>{module}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => handleContactUs(pkg.ctaSource)}
        className="w-full mt-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
      >
        Enquire About Package <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default PackageCard;