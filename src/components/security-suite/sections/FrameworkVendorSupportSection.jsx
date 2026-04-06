import React from 'react';
import { motion } from 'framer-motion';
import { Library, Briefcase, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const supportFeatures = [
  {
    icon: Library,
    title: "Framework and Compliance Assessment",
    description: "Supports ISO 27001, NIST CSF 2.0, NIST AI RMF, NIS2, DORA, PCI-DSS, and more.",
    comingSoon: false
  },
  {
    icon: Briefcase,
    title: "Vendor and Third Party Risk Management",
    description: "Tailored questionnaires and lifecycle management for all your third-party vendors.",
    comingSoon: false
  },
  {
    icon: ShieldCheck,
    title: "DPIA Tools",
    description: "Streamline your Data Protection Impact Assessments.",
    comingSoon: true
  },
  {
    icon: ClipboardCheck,
    title: "Individual Risk Assessments",
    description: "Conduct granular risk assessments on specific assets or processes.",
    comingSoon: true
  }
];

const FrameworkVendorSupportSection = ({ handleContactUsFramework }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            Comprehensive <span className="gradient-text">Framework & Vendor Support</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Address a wide range of leading cybersecurity frameworks and manage your entire vendor lifecycle with tailored assessment capabilities.
          </p>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto mt-6">
            Our platform now supports AI-specific risk assessments. We help you navigate the unique challenges of AI implementation using established guidelines like the <span className="text-cyan-600 font-semibold">NIST AI Risk Management Framework (RMF)</span>.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {supportFeatures.map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="relative feature-card-border rounded-lg p-8 bg-white/90 backdrop-blur-sm flex flex-col items-center text-center hover:shadow-xl transition-shadow">
              {feature.comingSoon && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-cyan-100 text-cyan-800">
                    Coming Soon
                  </span>
                </div>
              )}
              <feature.icon className={`h-12 w-12 mb-4 ${feature.comingSoon ? 'text-slate-400' : 'text-blue-600'}`} />
              <h4 className={`text-2xl font-bold mb-2 ${feature.comingSoon ? 'text-slate-500' : 'text-slate-800'}`}>{feature.title}</h4>
              <p className={`${feature.comingSoon ? 'text-slate-400' : 'text-slate-600'}`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="text-center text-slate-500 mt-8 text-lg">
          Looking for another framework or specific assessment type? <Button variant="link" onClick={handleContactUsFramework} className="text-blue-600 hover:text-blue-700 p-0 h-auto">Let us know!</Button> We're always expanding.
        </motion.p>
      </div>
    </section>
  );
};

export default FrameworkVendorSupportSection;