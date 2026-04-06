import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import IframeBookingModal from './IframeBookingModal';

const CTASection = ({ onGetStarted }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="feature-card-border rounded-2xl p-12 bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-sm shadow-xl"
        >
          <Zap className="h-16 w-16 text-blue-600 mx-auto mb-6 pulse-glow" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            Ready to Secure Your Future?
          </h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Join the organisations that trust Cy-Sec for their cybersecurity needs. Let's build a safer digital world together.
          </p>
          <Button 
            onClick={handleGetStarted} 
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-4 text-lg glow-effect"
          >
            Start Your Security Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      <IframeBookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        url="https://cy-sec.online"
      />
    </section>
  );
};

export default CTASection;