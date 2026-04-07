import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Award, Brain, GraduationCap, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HybridCoursesPage = () => {
  const navigate = useNavigate();

  const handleContactUs = (source) => {
    navigate(`/contact?source=hybrid_module_${source}`);
  };

  const hybridModules = [
    { name: "CompTIA Network+ (N10-009)", price: "£1200 exc VAT", features: ["CertMaster Platform Access", "eBook & Study Materials", "Interactive Labs", "Exam Voucher Included", "Weekly Live Instructor Sessions", "Dedicated Tutor Support"], ctaSource: "network_plus_hybrid", logoUrl: "/logos/comptia-network-plus.svg" },
    { name: "CompTIA Security+ (SY0-701)", price: "£1200 exc VAT", features: ["CertMaster Platform Access", "eBook & Study Materials", "Interactive Labs", "Exam Voucher Included", "Weekly Live Instructor Sessions", "Dedicated Tutor Support"], ctaSource: "security_plus_hybrid", logoUrl: "/logos/comptia-security-plus.svg" },
    { name: "CompTIA CySA+ (CS0-003)", price: "£1200 exc VAT", features: ["CertMaster Platform Access", "eBook & Study Materials", "Interactive Labs", "Exam Voucher Included", "Weekly Live Instructor Sessions", "Dedicated Tutor Support"], ctaSource: "cysa_plus_hybrid", logoUrl: "/logos/comptia-cysa-plus.svg" },
    { name: "CompTIA Cloud+ (CV0-004)", price: "£1200 exc VAT", features: ["CertMaster Platform Access", "eBook & Study Materials", "Interactive Labs", "Exam Voucher Included", "Weekly Live Instructor Sessions", "Dedicated Tutor Support"], ctaSource: "cloud_plus_hybrid" },
    { name: "CompTIA AI Essentials", price: "£600 exc VAT", features: ["CertMaster Platform Access", "eBook & Study Materials", "Interactive Labs", "Weekly Live Instructor Sessions", "Dedicated Tutor Support"], ctaSource: "ai_essentials_hybrid" },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="outline" onClick={() => navigate('/training')} className="text-purple-600 border-purple-500 hover:bg-purple-50">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Training Solutions
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Brain className="h-16 w-16 text-purple-600 mx-auto mb-6 pulse-glow" />
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            Individual <span className="gradient-text">CompTIA Modules (Hybrid Approach)</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Focus on specific CompTIA certifications with weekly expert-led, live instructor sessions and dedicated tutor support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hybridModules.map((mod, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="feature-card-border rounded-xl p-8 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group flex flex-col shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <GraduationCap className="h-10 w-10 text-purple-600" />
                {mod.logoUrl && (
                  <img src={mod.logoUrl} alt={`${mod.name} logo`} className="h-16 w-auto object-contain rounded-md bg-white p-1" />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-800">{mod.name}</h3>
              <p className="text-xl font-semibold text-purple-600 mb-6">{mod.price}</p>
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
                className="w-full mt-auto border-purple-500 text-purple-600 hover:bg-purple-50"
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
          All roles and courses can be mapped to <span className="font-semibold text-purple-600">UK Cyber Security Council Job Roles</span>.
          <br />
          Our hybrid model combines the best of self-paced learning with expert guidance for optimal results.
        </motion.p>

        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="feature-card-border rounded-2xl p-12 bg-gradient-to-br from-white/90 to-purple-50/80 backdrop-blur-sm shadow-xl"
            >
              <Award className="h-16 w-16 text-purple-600 mx-auto mb-6 pulse-glow" />
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-800">
                Ready for a <span className="gradient-text">Balanced Learning Experience?</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our hybrid modules offer structured support alongside flexible learning to ensure your success.
              </p>
              <Button 
                onClick={() => navigate('/contact?source=hybrid_page_cta')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-10 py-3 text-lg glow-effect"
              >
                Contact Us For Details <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HybridCoursesPage;