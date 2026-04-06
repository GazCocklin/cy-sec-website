import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TrainingCTASection = ({ handleContactUs }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="feature-card-border rounded-2xl p-12 bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-sm shadow-xl"
        >
          <Award className="h-16 w-16 text-blue-600 mx-auto mb-6 pulse-glow" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            Ready to <span className="gradient-text">Advance Your Skills?</span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Whether you're an individual looking to upskill or an organization seeking to empower your team, we have the right cybersecurity training solution. Let's discuss your goals.
          </p>
          <Button
            onClick={() => handleContactUs('final_cta')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-4 text-lg glow-effect"
          >
            Contact Us Today <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingCTASection;