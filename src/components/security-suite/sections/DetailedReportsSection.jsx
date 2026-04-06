import React from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart3, CheckCircle } from 'lucide-react';

const DetailedReportsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">
              Dive Deep into <span className="gradient-text">Detailed Reports</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Move beyond high-level summaries. Our platform generates in-depth reports that provide a clear, comprehensive view of your security posture, highlighting both strengths and areas for improvement.
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center">
                <Search className="h-6 w-6 text-blue-600 mr-3" />
                Pinpoint your top 5 highest-risk controls instantly.
              </li>
              <li className="flex items-center">
                <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                Analyze compliance scores for each framework section.
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                Get key metrics like compliant controls and high-risk items.
              </li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative feature-card-border rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-xl">
            <img className="w-full h-auto rounded-lg shadow-2xl" alt="A detailed security assessment report showing an overall compliance score of 75%, key metrics, and a breakdown of compliance by section." src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/4a06277da9c26faf7b60d3eed3ab4393.png" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DetailedReportsSection;