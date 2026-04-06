import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import IframeBookingModal from './IframeBookingModal';

const LandingPageHero = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-900">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1698337313210-baf78bfa4f05)',
          filter: 'brightness(0.2)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-900 z-0" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mt-0">
            Cybersecurity Leadership. <br className="hidden md:block" />
            <span className="text-[#00D9FF]">Compliance. Training.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light">
            One partner. Everything your organisation needs to stay secure, stay compliant, and stay ahead.
          </p>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From board-level vCISO guidance and DORA/NIS2 sprint readiness, to CompTIA certified training and our all-in-one compliance platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 w-full">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-[#00D9FF] hover:bg-[#00b3d4] text-[#0A1E3F] px-8 py-6 text-lg font-semibold shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Free Discovery Call
            </Button>
            <Button 
              onClick={() => navigate('/vciso')}
              variant="outline"
              className="w-full sm:w-auto border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF]/10 px-8 py-6 text-lg font-semibold bg-transparent backdrop-blur-sm"
            >
              Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
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

export default LandingPageHero;