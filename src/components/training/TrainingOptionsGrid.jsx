import React from 'react';
import { motion } from 'framer-motion';
import TrainingOptionCard from '@/components/training/TrainingOptionCard';

const TrainingOptionsGrid = ({ trainingOptions }) => {
  return (
    <section id="training-options" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            Choose Your <span className="gradient-text">Learning Path</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We offer a variety of training formats to suit your learning style, schedule, and organizational requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {trainingOptions.map((option, index) => (
            <TrainingOptionCard key={index} option={option} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingOptionsGrid;