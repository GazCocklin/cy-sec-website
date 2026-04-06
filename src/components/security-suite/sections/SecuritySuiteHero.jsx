import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Tag, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FORTIFYONE_LOGO_URL } from '@/lib/logoConfig';

const SecuritySuiteHero = ({ handleGetStarted, handleExplorePlans }) => {
  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center">
          <img 
            src={FORTIFYONE_LOGO_URL} 
            alt="FortifyOne" 
            className="w-[280px] md:w-[350px] lg:w-[400px] h-auto mb-6"
          />
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8 mt-2">
            All your cyber risk and compliance. One platform. Total control.
          </p>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="max-w-3xl mx-auto mb-10 p-6 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left">
              <UserCheck className="h-12 w-12 text-blue-500 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-blue-800">Expert Consultancy Services Available</h3>
                <p className="text-slate-600 mt-1">FortifyOne services can be paired with expert consultancy, from individual projects to longer-term vCISO engagements.</p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={handleGetStarted} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-4 text-lg glow-effect w-full sm:w-auto">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button onClick={handleExplorePlans} variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 px-10 py-4 text-lg w-full sm:w-auto">
              <Tag className="mr-2 h-5 w-5" /> View Plans & Features
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecuritySuiteHero;