import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, CheckCircle, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PlatformHighlightSection = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/security-suite');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">
              Data-Driven <span className="gradient-text">Security Posture</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Our FortifyOne platform transforms complex compliance data into a clear, actionable Organisational Security Maturity score. Understand your security posture at a glance and track improvements over time.
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center">
                <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                Holistic scoring based on compliance assessments.
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                Clear maturity levels from 'Poor' to 'Excellent'.
              </li>
              <li className="flex items-center">
                <Shield className="h-6 w-6 text-blue-600 mr-3" />
                Demonstrate proactive and adaptive security management.
              </li>
            </ul>
            <Button onClick={handleLearnMore} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-md glow-effect">
              Explore the Platform <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative feature-card-border rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-xl"
          >
            <img
              className="w-full h-auto rounded-lg shadow-2xl"
              alt="Dashboard showing Organisational Security Maturity at 90% (Excellent), with a maturity level guide."
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/f40ef007b9f348d571bfdf89d58db63a.png"
            />
            <p className="text-center text-sm text-slate-500 mt-2">
              Visualize your compliance and risk posture with intuitive dashboards.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlatformHighlightSection;