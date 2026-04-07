import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BottomCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-50 rounded-3xl p-12 md:p-16 shadow-xl border border-slate-200"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Secure Your Organisation?
          </h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Book a free 30-minute discovery call. No jargon. No hard sell. Just clarity on where you stand and what you need.
          </p>
          <Button 
            onClick={() => navigate('/contact')}
            className="bg-[#1A56DB] hover:bg-[#1e3a8a] text-white px-12 py-6 text-xl font-bold shadow-lg"
          >
            Book Your Free Call <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </motion.div>
      </div>

    </section>
  );
};

export default BottomCTASection;