import React from 'react';
import { motion } from 'framer-motion';
import PackageCard from '@/components/training/PackageCard';

const CompletePackagesGrid = ({ completePackages, handleContactUs }) => {
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
            Complete <span className="gradient-text">Career Packages</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive programs designed to equip you for specific cybersecurity roles, combining certifications with practical skills and career support.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {completePackages.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg} index={index} handleContactUs={handleContactUs} />
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-slate-500 mt-12 text-lg"
        >
          All roles and courses can be mapped to <span className="font-semibold text-blue-600">UK Cyber Security Council Job Roles</span>.
          <br />
          Launching Summer 2026 — Join the Waitlist: Cyber Security GRC Analyst & Cyber Security Management career packages.
        </motion.p>
      </div>
    </section>
  );
};

export default CompletePackagesGrid;