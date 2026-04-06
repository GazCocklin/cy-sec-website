import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Award, BookOpenCheck, GraduationCap, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SelfStudyModulesPage = () => {
  const navigate = useNavigate();

  const handleContactUs = (source) => {
    navigate(`/contact?source=self_study_module_${source}`);
  };

  const selfStudyModules = [
    { 
      name: "CompTIA Network+ (N10-009)", 
      features: ["Access to CompTIA CertMaster", "Access to CompTIA eBook", "Access to CompTIA Labs", "Exam Voucher Included"], 
      ctaSource: "network_plus_self_study",
      logoUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/3df7b6b955aa323a935b0a0a5fbb615a.jpg"
    },
    { 
      name: "CompTIA Security+ (SY0-701)", 
      features: ["Access to CompTIA CertMaster", "Access to CompTIA eBook", "Access to CompTIA Labs", "Exam Voucher Included"], 
      ctaSource: "security_plus_self_study",
      logoUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/12392169cf2aad613da39d4388d016d6.jpg"
    },
    { 
      name: "CompTIA CySA+ (CS0-003)", 
      features: ["Access to CompTIA CertMaster", "Access to CompTIA eBook", "Access to CompTIA Labs", "Exam Voucher Included"], 
      ctaSource: "cysa_plus_self_study",
      logoUrl: "https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/863cf9a0336d01766b980e19b18ae2e3.png"
    },
    { 
      name: "CompTIA Cloud+ (CV0-004)", 
      features: ["Access to CompTIA CertMaster", "Access to CompTIA eBook", "Access to CompTIA Labs", "Exam Voucher Included"], 
      ctaSource: "cloud_plus_self_study"
    },
    { 
      name: "CompTIA AI Essentials", 
      features: ["Access to CompTIA CertMaster", "Access to CompTIA eBook", "Access to CompTIA Labs"], 
      ctaSource: "ai_essentials_self_study" 
    },
  ];

  return (
    <>
      <Helmet>
        <title>Self-Study CompTIA Modules | Cy-Sec</title>
        <meta name="description" content="Master CompTIA certifications at your own pace. Explore self-study modules for Network+, Security+, CySA+, Cloud+, and AI Essentials." />
      </Helmet>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button variant="outline" onClick={() => navigate('/training')} className="text-blue-600 border-blue-500 hover:bg-blue-50">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Training Solutions
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <BookOpenCheck className="h-16 w-16 text-green-600 mx-auto mb-6 pulse-glow" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
              Individual <span className="gradient-text">CompTIA Modules (Self-Study)</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Master specific CompTIA certifications at your own pace with our comprehensive self-study resources. Each module provides all the materials you need for success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selfStudyModules.map((mod, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="feature-card-border rounded-xl p-8 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group flex flex-col shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <GraduationCap className="h-10 w-10 text-green-600" />
                  {mod.logoUrl && (
                    <img src={mod.logoUrl} alt={`${mod.name} logo`} className="h-16 w-auto object-contain rounded-md bg-white p-1" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-6 text-slate-800">{mod.name}</h3>
                <ul className="space-y-2 mb-6 text-slate-600 text-sm flex-grow">
                  {mod.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => handleContactUs(mod.ctaSource)}
                  variant="outline"
                  className="w-full mt-auto border-green-500 text-green-600 hover:bg-green-50"
                >
                  Enquire About Module <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-slate-500 mt-16 text-lg"
          >
            All self-study modules provide comprehensive access to official CompTIA learning platforms.
            <br />
            Achieve your certification goals with the flexibility to learn on your schedule.
          </motion.p>

          <section className="py-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="feature-card-border rounded-2xl p-12 bg-gradient-to-br from-white/90 to-green-50/80 backdrop-blur-sm shadow-xl"
              >
                <Award className="h-16 w-16 text-green-600 mx-auto mb-6 pulse-glow" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-800">
                  Ready to <span className="gradient-text">Start Your Self-Paced Journey?</span>
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Our self-study modules offer the ultimate flexibility to gain valuable CompTIA certifications.
                </p>
                <Button 
                  onClick={() => navigate('/contact?source=self_study_page_cta')}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-10 py-3 text-lg glow-effect"
                >
                  Contact Us For Details <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SelfStudyModulesPage;