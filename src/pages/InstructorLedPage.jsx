import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Award, Users, GraduationCap, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const InstructorLedPage = () => {
  const navigate = useNavigate();

  const handleContactUs = (source) => {
    navigate(`/contact?source=instructor_led_module_${source}`);
  };

  const instructorLedModules = [
    { name: "CompTIA Network+ (N10-009)", features: ["5-Day Live Instructor-Led Bootcamp", "Official CompTIA eBook & Materials", "Hands-On Interactive Labs", "Exam Voucher Included", "Post-Course Instructor Support", "Peer Collaboration Opportunities"], ctaSource: "network_plus_instructor_led", logoUrl: "/logos/comptia-network-plus.svg" },
    { name: "CompTIA Security+ (SY0-701)", features: ["5-Day Live Instructor-Led Bootcamp", "Official CompTIA eBook & Materials", "Hands-On Interactive Labs", "Exam Voucher Included", "Post-Course Instructor Support", "Peer Collaboration Opportunities"], ctaSource: "security_plus_instructor_led", logoUrl: "/logos/comptia-security-plus.svg" },
    { name: "CompTIA CySA+ (CS0-003)", features: ["5-Day Live Instructor-Led Bootcamp", "Official CompTIA eBook & Materials", "Hands-On Interactive Labs", "Exam Voucher Included", "Post-Course Instructor Support", "Peer Collaboration Opportunities"], ctaSource: "cysa_plus_instructor_led", logoUrl: "/logos/comptia-cysa-plus.svg" },
    { name: "CompTIA Cloud+ (CV0-004)", features: ["5-Day Live Instructor-Led Bootcamp", "Official CompTIA eBook & Materials", "Hands-On Interactive Labs", "Exam Voucher Included", "Post-Course Instructor Support", "Peer Collaboration Opportunities"], ctaSource: "cloud_plus_instructor_led" },
    { name: "CompTIA AI Essentials", features: ["2-Day Live Instructor-Led Workshop", "Official CompTIA eBook & Materials", "Hands-On Interactive Labs", "Post-Course Instructor Support", "Peer Collaboration Opportunities"], ctaSource: "ai_essentials_instructor_led" },
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
          <Users className="h-16 w-16 text-blue-600 mx-auto mb-6 pulse-glow" />
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            Individual <span className="gradient-text">CompTIA Modules (Instructor-Led)</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Immerse yourself in focused, expert-led training sessions. Our instructor-led courses provide a structured and interactive learning environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructorLedModules.map((mod, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="feature-card-border rounded-xl p-8 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group flex flex-col shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <GraduationCap className="h-10 w-10 text-blue-600" />
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
                className="w-full mt-auto border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                Enquire About Course <ArrowRight className="ml-2 h-4 w-4" />
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
          All roles and courses can be mapped to <span className="font-semibold text-blue-600">UK Cyber Security Council Job Roles</span>.
          <br />
          Our instructor-led courses offer the most direct path to certification with expert guidance.
        </motion.p>

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
                Ready for an <span className="gradient-text">Immersive Learning Experience?</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Get direct access to industry experts and accelerate your learning in our live bootcamps.
              </p>
              <Button 
                onClick={() => navigate('/contact?source=instructor_led_page_cta')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-3 text-lg glow-effect"
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

export default InstructorLedPage;