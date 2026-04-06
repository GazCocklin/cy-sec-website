import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ComparisonMethodCard = ({ item, index, handleContactUs }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="feature-card-border rounded-xl p-8 bg-white/90 backdrop-blur-sm flex flex-col shadow-lg"
    >
      <item.icon className={`h-12 w-12 ${item.color} mb-6`} />
      <h3 className={`text-2xl font-bold mb-4 ${item.color}`}>{item.method}</h3>
      <ul className="space-y-3 text-slate-600 flex-grow">
        {item.points.map((point, pIndex) => (
          <li key={pIndex} className="flex items-start">
            <point.icon className={`h-5 w-5 ${item.color} mr-3 mt-1 flex-shrink-0`} />
            <span>{point.text}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => handleContactUs(`compare_${item.method.toLowerCase().replace(' ', '_')}`)}
        variant="outline"
        className={`w-full mt-8 border-${item.color.split('-')[1]}-500 ${item.color} hover:bg-${item.color.split('-')[1]}-500/10`}
      >
        Learn More <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default ComparisonMethodCard;