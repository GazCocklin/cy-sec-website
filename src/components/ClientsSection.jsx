import React from 'react';
import { motion } from 'framer-motion';

const ClientsSection = () => {
  const clientLogos = [
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/851d2a0bb6087c63fa2c31f8b914ff15.webp",
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/4769cf87ab61e94b58c6fa7e154146b5.png",
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/93dac3d6fa4c67fc9e83c9aa82e8b058.jpg",
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/79a220dbef5c7205da861413a5d82b4a.png",
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/7a677277a84adb7f8d89aec420680dfe.png"
  ];

  const clientAlts = [
    "BCS The Chartered Institute for IT Logo",
    "CompTIA Logo",
    "Masterschool Logo",
    "Firebrand Training Logo",
    "Learning People Logo"
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            Trusted By <span className="gradient-text">Leading</span> Organisations
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We are proud to partner with businesses of all sizes, helping them navigate 
            the complex landscape of cybersecurity.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8 items-center">
          {clientLogos.map((logoUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              className="flex justify-center items-center p-4 client-logo-container rounded-lg backdrop-blur-sm h-32 shadow-md"
            >
              <img  
                src={logoUrl} 
                alt={clientAlts[index]} 
                className="max-h-16 w-auto filter grayscale hover:grayscale-0 transition-all duration-300" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;