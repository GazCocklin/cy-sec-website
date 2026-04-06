import React from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, Sliders, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ClearActionableReportingSection = ({ handleExplorePlans }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative feature-card-border rounded-2xl p-6 bg-white/90 backdrop-blur-sm order-1 lg:order-2 shadow-xl">
            <img className="w-full h-auto rounded-lg shadow-2xl" alt="Graphical representation of risk distribution across critical, high, medium, and low categories" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/352392e2fb1f0970328997c51cba6fc3.png" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6 order-2 lg:order-1">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">
              Clear, Actionable <span className="gradient-text">Reporting for All Risks</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Generate comprehensive PDF reports that clearly articulate your internal compliance status and vendor risk profiles. Perfect for internal reviews, stakeholder updates, and external audits.
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center">
                <FileSpreadsheet className="h-6 w-6 text-blue-600 mr-3" />
                Visually appealing executive summaries.
              </li>
              <li className="flex items-center">
                <Sliders className="h-6 w-6 text-blue-600 mr-3" />
                Detailed breakdowns by domain, control, and vendor.
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                Evidence summaries included where applicable.
              </li>
            </ul>
            <Button onClick={handleExplorePlans} variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-3 text-md">
              Explore Plans & Features
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClearActionableReportingSection;