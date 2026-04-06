import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const HolisticRiskOverviewSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">
              Holistic <span className="gradient-text">Risk Overview</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Gain powerful insights into your internal compliance and external vendor risks through beautifully presented dashboards and detailed reports.
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                At-a-glance compliance & vendor risk status.
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                Detailed scoring for frameworks & vendors.
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                Quick access to consolidated reports.
              </li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative feature-card-border rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-xl">
            <img className="w-full h-auto rounded-lg shadow-2xl" alt="Screenshot of the Organizational Security Maturity dashboard displaying 90% score and maturity levels" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/d3fec024a811c309cd97fdf482bcf673.png" />
            <p className="text-center text-sm text-slate-500 mt-2">Integrated Risk Dashboards: Track progress across compliance frameworks and vendor assessments. Identify gaps, monitor remediation, and make data-driven decisions with a comprehensive overview.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HolisticRiskOverviewSection;