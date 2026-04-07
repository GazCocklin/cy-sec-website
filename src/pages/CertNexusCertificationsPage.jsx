import React, { useState, useMemo } from 'react';
import TransparentBadge from '@/components/TransparentBadge';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Award, BookOpenCheck, ChevronLeft, UserCheck, Combine, ShieldCheck, ShieldPlus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { cn } from '@/lib/utils';

const CertNexusCertificationsPage = () => {
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState('self-study');

  const handleContactUs = (source) => {
    navigate(`/contact?source=certnexus_cert_${source}`);
  };

  const allCourses = [
    // Self-Study
    { name: "CyberSec First Responder (CFR)", delivery: "self-study", features: ["Official CertNexus Courseware", "Interactive Labs & Exercises", "Exam Voucher Included"], ctaSource: "cfr_self_study", icon: ShieldCheck },
    { name: "CyberSec First Responder - Advanced (CFR-A)", delivery: "self-study", features: ["Official CertNexus Courseware", "Advanced Labs & Scenarios", "Exam Voucher Included"], ctaSource: "cfra_self_study", icon: ShieldPlus },
    { name: "CyberSAFE", delivery: "self-study", features: ["End-User Security Awareness Training", "Interactive Modules", "Completion Certificate"], ctaSource: "cybersafe_self_study", icon: Users },
    
    // Instructor-Led
    { name: "CyberSec First Responder (CFR)", delivery: "instructor-led", features: ["Live Instructor-Led Sessions", "Interactive Q&A with Experts", "Structured Class Schedule", "All Self-Study Materials Included"], ctaSource: "cfr_instructor_led", icon: ShieldCheck },
    { name: "CyberSec First Responder - Advanced (CFR-A)", delivery: "instructor-led", features: ["Live Instructor-Led Sessions", "Advanced Threat Scenarios", "Structured Class Schedule", "All Self-Study Materials Included"], ctaSource: "cfra_instructor_led", icon: ShieldPlus },
    { name: "CyberSAFE", delivery: "instructor-led", features: ["Engaging Live Training for Staff", "Customizable Scenarios", "Q&A with Security Experts"], ctaSource: "cybersafe_instructor_led", icon: Users },

    // Hybrid
    { name: "CyberSec First Responder (CFR)", delivery: "hybrid", features: ["Self-Paced Learning with Instructor Support", "On-Demand Videos & Live Workshops", "Dedicated Mentor Access", "All Self-Study Materials Included"], ctaSource: "cfr_hybrid", icon: ShieldCheck },
    { name: "CyberSec First Responder - Advanced (CFR-A)", delivery: "hybrid", features: ["Self-Paced Advanced Learning", "Live Expert-Led Workshops", "Dedicated Mentor Access", "All Self-Study Materials Included"], ctaSource: "cfra_hybrid", icon: ShieldPlus },
    { name: "CyberSAFE", delivery: "hybrid", features: ["Flexible Online Modules", "Scheduled Live Q&A Sessions", "Ongoing Security Awareness Support"], ctaSource: "cybersafe_hybrid", icon: Users },
  ];

  const filteredCourses = useMemo(() => 
    allCourses.filter(course => course.delivery === deliveryMethod),
    [deliveryMethod, allCourses]
  );

  const deliveryOptions = {
    'self-study': {
      icon: BookOpenCheck,
      title: 'Self-Study Modules',
      description: 'Master emerging tech certifications at your own pace with our comprehensive self-study resources.'
    },
    'instructor-led': {
      icon: UserCheck,
      title: 'Instructor-Led Courses',
      description: 'Learn directly from industry experts in a structured, interactive classroom environment.'
    },
    'hybrid': {
      icon: Combine,
      title: 'Hybrid Programs',
      description: 'The perfect blend of flexible self-study and scheduled instructor-led workshops.'
    }
  };

  const currentOption = deliveryOptions[deliveryMethod];

  return (
    <>
      <Helmet>
        <title>CertNexus Professional Certifications | CFR, CyberSAFE & More | Cy-Sec</title>
        <meta name="description" content="Explore official CertNexus certifications like CyberSec First Responder (CFR) and CyberSAFE. Choose from self-study, instructor-led, or hybrid learning options." />
      </Helmet>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button variant="outline" onClick={() => navigate('/training-delivery')} className="text-blue-600 border-blue-500 hover:bg-blue-50">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to All Training
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <TransparentBadge src="/logos/certnexus-partner-badge.png" alt="CertNexus Logo" className="h-20 mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
              CertNexus <span className="gradient-text-blue">Certifications</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Master the skills of tomorrow. We offer official CertNexus certifications in high-demand fields like cybersecurity response and end-user security awareness.
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
            <div className="bg-slate-200/80 p-1 rounded-full shadow-inner flex items-center space-x-1">
              {Object.keys(deliveryOptions).map((key) => (
                <button
                  key={key}
                  onClick={() => setDeliveryMethod(key)}
                  className={cn(
                    "px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base font-semibold rounded-full transition-colors duration-300 relative",
                    deliveryMethod === key ? "text-white" : "text-slate-600 hover:bg-white/50"
                  )}
                >
                  {deliveryMethod === key && (
                    <motion.div
                      layoutId="active-pill-certnexus"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 capitalize">{key.replace('-', ' ')}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={deliveryMethod}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-12">
                <currentOption.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-slate-800 mb-2">{currentOption.title}</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">{currentOption.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((mod, index) => (
                  <motion.div
                    key={`${mod.name}-${mod.delivery}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="feature-card-border rounded-xl p-8 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group flex flex-col shadow-lg"
                  >
                     <div className="flex justify-between items-start mb-4">
                      {mod.icon && <mod.icon className="h-10 w-10 text-blue-600" />}
                    </div>
                    <h4 className="text-xl font-bold mb-6 text-slate-800">{mod.name}</h4>
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
                      className="w-full mt-auto border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      Enquire About Course <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <section className="py-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="feature-card-border rounded-2xl p-12 bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-sm shadow-xl"
              >
                <Award className="h-16 w-16 text-blue-600 mx-auto mb-6 pulse-glow" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-800">
                  Ready to <span className="gradient-text-blue">Future-Proof Your Career?</span>
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Our CertNexus training programs are your gateway to becoming an expert in emerging technologies.
                </p>
                <Button 
                  onClick={() => navigate('/contact?source=certnexus_cert_page_cta')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-3 text-lg glow-effect"
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

export default CertNexusCertificationsPage;