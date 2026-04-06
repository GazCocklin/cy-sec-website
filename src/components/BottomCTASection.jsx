import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import IframeBookingModal from './IframeBookingModal';

const BottomCTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-50 rounded-3xl p-12 md:p-16 shadow-xl border border-slate-200"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1E3F] mb-6">
            Ready to Secure Your Organisation?
          </h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Book a free 30-minute discovery call. No jargon. No hard sell. Just clarity on where you stand and what you need.
          </p>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#00D9FF] hover:bg-[#00b3d4] text-[#0A1E3F] px-12 py-6 text-xl font-bold shadow-lg"
          >
            Book Your Free Call <ArrowRight className="ml-2 h-6 w-6" />
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

export default BottomCTASection;