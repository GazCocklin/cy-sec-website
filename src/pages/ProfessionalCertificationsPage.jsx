import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Award, BookOpenCheck, GraduationCap, ChevronLeft, Construction, UserCheck, Combine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { cn } from '@/lib/utils';

const ProfessionalCertificationsPage = () => {
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState('self-study');

  const handleContactUs = (source) => {
    navigate(`/contact?source=prof_cert_${source}`);
  };

  const allCourses = [
    // Self-Study
    { name: "CompTIA Network+ (N10-009)", delivery: "self-study", features: ["Access to CompTIA CertMaster", "Access to CompTIA eBook", "Access to CompTIA Labs", "Exam Voucher Included"], ctaSource: "network_plus_self_study", logoUrl: "/logos/comptia-network-plus.svg" },
    { name: "CompTIA Security+ (SY0-701)", delivery: "self-study", features: ["Access to CompTIA CertMaster", "Access to CompTIA eBook", "Access to CompTIA Labs", "Exam Voucher Included"], ctaSource: "security_plus_self_study", logoUrl: "/logos/comptia-security-plus.svg" },
    { name: "CompTIA CySA+ (CS0-003)", delivery: "self-study", features: ["Access to CompTIA CertMaster", "Access to CompTIA eBook", "Access to CompTIA Labs", "Exam Voucher Included"], ctaSource: "cysa_plus_self_study", logoUrl: "/logos/comptia-cysa-plus.svg" },
    { name: "CompTIA Cloud+ (CV0-004)", delivery: "self-study", features: ["Access to CompTIA CertMaster", "Access to CompTIA eBook", "Access to CompTIA Labs", "Exam Voucher Included"], ctaSource: "cloud_plus_self_study" },
    { name: "CompTIA AI Essentials", delivery: "self-study", features: ["Access to CompTIA CertMaster", "Access to CompTIA eBook", "Access to CompTIA Labs"], ctaSource: "ai_essentials_self_study" },
    
    // Instructor-Led
    { name: "CompTIA Network+ (N10-009)", delivery: "instructor-led", features: ["Live Instructor-Led Sessions", "Interactive Q&A with Experts", "Structured Class Schedule", "All Self-Study Materials Included"], ctaSource: "network_plus_instructor_led", logoUrl: "/logos/comptia-network-plus.svg" },
    { name: "CompTIA Security+ (SY0-701)", delivery: "instructor-led", features: ["Live Instructor-Led Sessions", "Interactive Q&A with Experts", "Structured Class Schedule", "All Self-Study Materials Included"], ctaSource: "security_plus_instructor_led", logoUrl: "/logos/comptia-security-plus.svg" },
    { name: "CompTIA CySA+ (CS0-003)", delivery: "instructor-led", features: ["Live Instructor-Led Sessions", "Interactive Q&A with Experts", "Structured Class Schedule", "All Self-Study Materials Included"], ctaSource: "cysa_plus_instructor_led", logoUrl: "/logos/comptia-cysa-plus.svg" },
    { name: "CompTIA Cloud+ (CV0-004)", delivery: "instructor-led", features: ["Live Instructor-Led Sessions", "Interactive Q&A with Experts", "Structured Class Schedule", "All Self-Study Materials Included"], ctaSource: "cloud_plus_instructor_led" },
    { name: "CompTIA AI Essentials", delivery: "instructor-led", features: ["Live Instructor-Led Sessions", "Interactive Q&A with Experts", "Structured Class Schedule", "All Self-Study Materials Included"], ctaSource: "ai_essentials_instructor_led" },

    // Hybrid
    { name: "CompTIA Network+ (N10-009)", delivery: "hybrid", features: ["Self-Paced Learning with Instructor Support", "On-Demand Videos & Live Workshops", "Dedicated Mentor Access", "All Self-Study Materials Included"], ctaSource: "network_plus_hybrid", logoUrl: "/logos/comptia-network-plus.svg" },
    { name: "CompTIA Security+ (SY0-701)", delivery: "hybrid", features: ["Self-Paced Learning with Instructor Support", "On-Demand Videos & Live Workshops", "Dedicated Mentor Access", "All Self-Study Materials Included"], ctaSource: "security_plus_hybrid", logoUrl: "/logos/comptia-security-plus.svg" },
    { name: "CompTIA CySA+ (CS0-003)", delivery: "hybrid", features: ["Self-Paced Learning with Instructor Support", "On-Demand Videos & Live Workshops", "Dedicated Mentor Access", "All Self-Study Materials Included"], ctaSource: "cysa_plus_hybrid", logoUrl: "/logos/comptia-cysa-plus.svg" },
    { name: "CompTIA Cloud+ (CV0-004)", delivery: "hybrid", features: ["Self-Paced Learning with Instructor Support", "On-Demand Videos & Live Workshops", "Dedicated Mentor Access", "All Self-Study Materials Included"], ctaSource: "cloud_plus_hybrid" },
    { name: "CompTIA AI Essentials", delivery: "hybrid", features: ["Self-Paced Learning with Instructor Support", "On-Demand Videos & Live Workshops", "Dedicated Mentor Access", "All Self-Study Materials Included"], ctaSource: "ai_essentials_hybrid" },
  ];

  const filteredCourses = useMemo(() => 
    allCourses.filter(course => course.delivery === deliveryMethod),
    [deliveryMethod]
  );

  const deliveryOptions = {
    'self-study': {
      icon: BookOpenCheck,
      title: 'Self-Study Modules',
      description: 'Master specific certifications at your own pace with our comprehensive self-study resources. Each module provides all the materials you need for success.'
    },
    'instructor-led': {
      icon: UserCheck,
      title: 'Instructor-Led Courses',
      description: 'Learn directly from industry experts in a structured, interactive classroom environment. Benefit from live instruction and real-time feedback.'
    },
    'hybrid': {
      icon: Combine,
      title: 'Hybrid Programs',
      description: 'Get the best of both worlds. Combine flexible self-study with scheduled instructor-led sessions for a comprehensive and supportive learning experience.'
    }
  };

  const currentOption = deliveryOptions[deliveryMethod];

  const ComingSoonCard = ({ title }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="feature-card-border rounded-xl p-8 bg-slate-100/50 backdrop-blur-sm flex flex-col items-center justify-center text-center shadow-lg h-full"
    >
        <Construction className="h-12 w-12 text-slate-500 mb-4" />
        <h3 className="text-2xl font-bold mb-2 text-slate-700">{title}</h3>
        <p className="text-slate-500">Coming Soon</p>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>Professional Certifications - CompTIA, BCS, ISACA | Cy-Sec</title>
        <meta name="description" content="Advance your cybersecurity career with professional certifications. Explore our CompTIA self-study, instructor-led, and hybrid modules, with BCS and ISACA certifications coming soon." />
      </Helmet>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button variant="outline" onClick={() => navigate('/training')} className="text-purple-600 border-purple-500 hover:bg-purple-50">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to All Training
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Award className="h-16 w-16 text-purple-600 mx-auto mb-6 pulse-glow" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
              Professional <span className="gradient-text-purple">Certifications</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose your preferred learning style and earn industry-recognized certifications to validate your skills and advance your career path.
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
                      layoutId="active-pill"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
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
                <currentOption.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-slate-800 mb-2">{currentOption.title}</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">{currentOption.description}</p>
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">CompTIA Certifications</h3>
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
                      <GraduationCap className="h-10 w-10 text-purple-600" />
                      {mod.logoUrl && (
                        <img src={mod.logoUrl} alt={`${mod.name} logo`} className="h-16 w-auto object-contain rounded-md bg-white p-1" />
                      )}
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
                      className="w-full mt-auto border-purple-500 text-purple-600 hover:bg-purple-50"
                    >
                      Enquire About Course <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-20">
             <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">More Certifications</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ComingSoonCard title="BCS Certifications" />
                <ComingSoonCard title="ISACA Certifications" />
             </div>
          </div>

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
                  Ready to <span className="gradient-text-purple">Start Your Certification Journey?</span>
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Our flexible training options are designed to help you achieve your certification goals.
                </p>
                <Button 
                  onClick={() => navigate('/contact?source=prof_cert_page_cta')}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-10 py-3 text-lg glow-effect"
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

export default ProfessionalCertificationsPage;