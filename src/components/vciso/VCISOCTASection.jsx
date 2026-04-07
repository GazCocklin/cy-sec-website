import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VCISOCTASection = () => {
  const navigate = useNavigate();

  const handleScheduleConsultation = () => {
    navigate('/contact?source=vciso_consultation');
  };

  const handleLearnMore = () => {
    navigate('/fortify-one');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1516383274235-5f42d6c6426d)',
          filter: 'brightness(0.3)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-blue-900/80" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Elevate Your <span className="text-cyan-400">Security Leadership?</span>
          </h2>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Partner with our expert Virtual CISO team to transform your cybersecurity programme. 
            Let's discuss how we can strengthen your security posture and drive strategic value.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              onClick={handleScheduleConsultation}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-6 text-lg glow-effect shadow-xl"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Button>
            <Button 
              onClick={handleLearnMore}
              variant="outline"
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-10 py-6 text-lg"
            >
              Explore Our Platform <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">15+</div>
              <p className="text-slate-300">Years Combined Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
              <p className="text-slate-300">Client Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
              <p className="text-slate-300">Security Support</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VCISOCTASection;