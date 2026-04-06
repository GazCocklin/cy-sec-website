import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FORTIFYLEARN_LOGO_URL } from '@/lib/logoConfig';

const TrainingHeroSection = ({ handleContactUs }) => {
  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <img 
              src={FORTIFYLEARN_LOGO_URL} 
              alt="FortifyLearn" 
              className="h-16 w-auto mb-4" 
            />
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-800 mt-0">
              Flexible <span className="gradient-text">Training Solutions</span>
              <br />
              Tailored For You
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Empower your team with industry-leading cybersecurity skills. Choose from self-study, instructor-led, hybrid, or fully customized training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => handleContactUs('hero_contact')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg glow-effect"
              >
                Discuss Your Needs
              </Button>
              <Button
                onClick={() => document.getElementById('training-options')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
              >
                Explore Options <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
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
                className="w-full h-auto rounded-lg"
                alt="Diverse group of professionals engaged in a cybersecurity training workshop" src="https://images.unsplash.com/photo-1565841327798-694bc2074762" />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrainingHeroSection;