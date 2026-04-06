import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Rocket, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ComingSoonPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <Helmet>
        <title>FortifyLearn - Coming Soon | Cy-Sec</title>
        <meta name="description" content="FortifyLearn is coming soon. Stay tuned for our advanced cybersecurity learning platform." />
      </Helmet>

      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center space-y-8 p-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 relative z-10"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Rocket className="h-12 w-12 text-blue-600" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">FortifyLearn</span>
          <br />
          is Launching Soon
        </h1>
        
        <p className="text-xl text-slate-600 leading-relaxed max-w-lg mx-auto">
          We're putting the finishing touches on our advanced cybersecurity learning platform. 
          Get ready to elevate your team's security awareness and professional skills.
        </p>

        <div className="pt-8">
          <Button 
            onClick={() => navigate('/')}
            className="px-8 py-6 text-lg font-medium bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Return to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoonPage;