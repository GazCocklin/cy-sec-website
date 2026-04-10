import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VCISOExplanation from '@/components/vciso/VCISOExplanation';
import VCISOServices from '@/components/vciso/VCISOServices';
import VCISOBenefits from '@/components/vciso/VCISOBenefits';
import VCISOCTASection from '@/components/vciso/VCISOCTASection';

const VCISOPage = () => {
  const navigate = useNavigate();

  const handleScheduleConsultation = () => {
    navigate('/contact?source=vciso_hero');
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Virtual CISO Service UK | vCISO for SMBs from £995/month | Cy-Sec</title>
        <meta name="description" content="Dedicated Virtual CISO service for UK small and mid-sized businesses. ISO 27001, DORA, NIS2 compliance support, FortifyOne platform included. Bronze from £995/month, Silver £2,250/month, Gold £4,500/month." />
      </Helmet>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1690192079529-9fd57e5b24d0)',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)' }}>
                From £995/month &middot; FortifyOne platform included
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Virtual CISO <span className="text-cyan-400">Services</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-200 max-w-4xl mx-auto leading-relaxed font-light">
              Executive-level security leadership and strategic guidance, 
              delivered with flexibility and expertise tailored to your organisation.
            </p>
            <div className="pt-6">
              <Button 
                onClick={handleScheduleConsultation}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-6 text-xl glow-effect shadow-2xl"
              >
                <Calendar className="mr-3 h-6 w-6" />
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-100 to-transparent" />
      </section>

      <VCISOExplanation />
      <VCISOServices />
      <VCISOBenefits />
      <VCISOCTASection />
    </div>
  );
};

export default VCISOPage;