import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, FileText } from 'lucide-react';

const ProgressTrackingSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative feature-card-border rounded-2xl p-6 bg-white/90 backdrop-blur-sm order-1 lg:order-2 shadow-xl">
            <img className="w-full h-auto rounded-lg shadow-2xl" alt="A chart showing score trends by framework, with one score at 75% and a later score at 90%, indicating a +15% improvement." src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/e0b1a9e7eccb28e0f303e06ff7edf9cc.png" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6 order-2 lg:order-1">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">
              Track Your Progress <span className="gradient-text">Over Time</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Cybersecurity is a journey, not a destination. Our platform helps you visualize your improvement with score trend analysis, making it easy to demonstrate progress to stakeholders and regulators.
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center">
                <TrendingUp className="h-6 w-6 text-green-500 mr-3" />
                See how your assessment scores evolve over time.
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                Measure the impact of your remediation efforts.
              </li>
              <li className="flex items-center">
                <FileText className="h-6 w-6 text-blue-600 mr-3" />
                Provide clear evidence of your commitment to security.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgressTrackingSection;