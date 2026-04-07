import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SolutionsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            Our <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive cybersecurity services designed to protect and empower your organisation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="feature-card-border rounded-2xl p-8 bg-white/80 backdrop-blur-sm shadow-lg flex flex-col"
          >
            <div className="flex items-center mb-6">
              <Eye className="h-8 w-8 text-blue-600 mr-4" />
              <h3 className="text-2xl font-bold text-slate-800">Training Delivery and Consultancy</h3>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
              Expert-led corporate training, professional certifications, and bespoke content creation to build a resilient security culture.
            </p>
            <Link to="/training-delivery" className="mt-auto">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white w-full">
                Explore Training <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="feature-card-border rounded-2xl p-8 bg-white/80 backdrop-blur-sm shadow-lg flex flex-col"
          >
            <div className="flex items-center mb-4">
               <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/01f303354e5d6ca92144a867dc53f612.png" 
                alt="Cy-Sec FortifyOne Logo" 
                className="h-10 w-auto mr-4"
              />
              <h3 className="text-2xl font-bold">
                 <span style={{background:"linear-gradient(90deg,#1A56DB,#06B6D4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Fortify<span style={{fontWeight:700}}>One</span></span>
              </h3>
            </div>
            <p className="text-slate-600 italic mb-6">All your cyber risk and compliance. One platform. Total control.</p>
            <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
              Integrated security management solutions that provide comprehensive 
              protection and monitoring for your digital infrastructure.
            </p>
            <Link to="/fortify-one" className="mt-auto">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white w-full">
                View FortifyOne <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="feature-card-border rounded-2xl p-8 bg-white/80 backdrop-blur-sm shadow-lg flex flex-col"
          >
            <div className="flex items-center mb-4">
              <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/1d16b841e7a0d19212a83dd81a65f809.png" 
                alt="Cy-Sec FortifyLearn Logo" 
                className="h-10 w-auto mr-4"
              />
              <h3 className="text-2xl font-bold">
                <span style={{background:"linear-gradient(90deg,#1A56DB,#06B6D4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Fortify<span style={{fontWeight:700}}>Learn</span></span>
              </h3>
            </div>
            <p className="text-slate-600 italic mb-4">Not Just Training. Transformation.</p>
            <p className="text-sm font-semibold text-blue-600 mb-6">Coming in 2025!</p>
            <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
              An interactive learning platform designed to deliver engaging and effective cybersecurity education, anytime and anywhere.
            </p>
            <Link to="/contact?source=fortify_learn" className="mt-auto">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white w-full">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;