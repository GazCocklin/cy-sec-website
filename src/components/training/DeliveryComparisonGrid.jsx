import React from 'react';
import { motion } from 'framer-motion';
import { BarChartHorizontal } from 'lucide-react';
import ComparisonMethodCard from '@/components/training/ComparisonMethodCard';

const DeliveryComparisonGrid = ({ deliveryComparison, handleContactUs }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <BarChartHorizontal className="h-16 w-16 text-blue-600 mx-auto mb-6 pulse-glow" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            Compare <span className="gradient-text">Delivery Methods</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Understand the key benefits of each training approach to choose the best fit for your learning style and goals.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deliveryComparison.map((item, index) => (
            <ComparisonMethodCard key={index} item={item} index={index} handleContactUs={handleContactUs} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryComparisonGrid;