import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TrainingOptionCard = ({ option, index }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="feature-card-border rounded-xl p-8 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group flex flex-col shadow-lg"
    >
      <option.icon className="h-12 w-12 text-blue-600 mb-6 group-hover:text-cyan-600 transition-colors" />
      <h3 className="text-2xl font-bold mb-4 text-slate-800">{option.title}</h3>
      <p className="text-slate-600 leading-relaxed mb-4 flex-grow">{option.description}</p>
      <ul className="space-y-2 mb-6 text-slate-600 text-sm flex-grow">
        {option.details.map((detail, idx) => (
          <li key={idx} className="flex">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={option.action}
        className="w-full mt-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
      >
        {option.cta} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default TrainingOptionCard;