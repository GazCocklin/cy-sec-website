import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const UrgencyBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0A1E3F] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1686403486693-fdae82af2506)',
          filter: 'brightness(0.15)'
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
            DORA Has Been Mandatory Since January 2025. <br className="hidden md:block" />
            <span className="text-[#00D9FF]">NIS2 Enforcement Is Active.</span> <br />
            Are You Compliant?
          </h2>
          
          <Button 
            onClick={() => navigate('/contact')}
            className="bg-[#00D9FF] hover:bg-[#00b3d4] text-[#0A1E3F] px-10 py-6 text-xl font-bold shadow-2xl transition-all"
          >
            Check Your Compliance Exposure — Free <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default UrgencyBanner;