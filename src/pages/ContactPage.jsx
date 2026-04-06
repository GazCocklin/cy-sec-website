import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import IframeBookingModal from '@/components/IframeBookingModal';

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-slate-50">
      <Helmet>
        <title>Contact Us | Book a Discovery Call | Cy-Sec</title>
        <meta name="description" content="Book a free discovery call or contact the Cy-Sec team to discuss your cybersecurity needs." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full text-center space-y-8 p-12 bg-white rounded-3xl shadow-xl border border-slate-100"
      >
        <div className="w-20 h-20 bg-[#00D9FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="h-10 w-10 text-[#00D9FF]" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          Book a <span className="text-[#00D9FF]">Discovery Call</span>
        </h1>
        
        <p className="text-lg text-slate-600">
          We've updated our booking and contact system. You can now seamlessly book a discovery call or reach our team using our integrated booking portal.
        </p>

        <div className="pt-4">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-6 text-xl font-bold bg-[#00D9FF] hover:bg-[#00b3d4] text-[#0A1E3F] shadow-lg transition-all"
          >
            Open Booking Portal <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </motion.div>

      <IframeBookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        url="https://cy-sec.online"
      />
    </div>
  );
};

export default ContactPage;