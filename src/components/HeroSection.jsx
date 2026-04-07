import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FORTIFYONE_LOGO_URL } from '@/lib/logoConfig';

const HeroSection = ({ onGetStarted, onLearnMore }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      navigate('/contact');
    }
  };

  return (
    <section className="relative pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <img 
              src={FORTIFYONE_LOGO_URL} 
              alt="FortifyOne" 
              className="h-12 w-auto mb-4" 
            />
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-800">
              <span className="gradient-text">Secure</span> Your
              <br />
              Digital Future
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Expert cybersecurity awareness training and consultancy services 
              to protect your organisation from evolving digital threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg glow-effect"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={onLearnMore}
                variant="outline" 
                className="border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
              >
                Learn More
              </Button>
            </div>
            
            <div className="pt-4 space-y-6">
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-slate-500">Follow us on:</span>
                <div className="flex items-center gap-3">
                  <a href="https://www.facebook.com/CySecLtd" target="_blank" rel="noopener noreferrer" className="group">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-slate-100 border border-slate-200 group-hover:bg-blue-600 group-hover:border-blue-700 transition-all duration-300">
                      <Facebook className="h-6 w-6 text-slate-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="https://www.linkedin.com/company/cy-sec-awareness-and-consultancy/" target="_blank" rel="noopener noreferrer" className="group">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-slate-100 border border-slate-200 group-hover:bg-blue-600 group-hover:border-blue-700 transition-all duration-300">
                      <Linkedin className="h-6 w-6 text-slate-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-slate-500">Authorised Partner:</span>
                <div className="flex items-center gap-4">
                   <img src="/logos/comptia-partner-badge.svg" alt="CompTIA Training Partner Logo" className="h-8 w-auto" />
                   <img src="/logos/certnexus-partner-badge.svg" alt="CertNexus Authorized Training Partner Logo" className="h-8 w-auto" />
                </div>
              </div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 feature-card-border rounded-2xl p-8 bg-white/80 backdrop-blur-sm floating-animation shadow-xl">
              <img   
                className="w-full h-auto rounded-lg object-cover aspect-video" 
                alt="Modern cybersecurity operations centre with holographic displays" 
                src="https://images.unsplash.com/photo-1644329770639-1a20809b82a3" 
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;