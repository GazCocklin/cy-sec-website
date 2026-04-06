import React from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  Shield, 
  FileCheck, 
  AlertTriangle, 
  Users, 
  Presentation 
} from 'lucide-react';

const services = [
  {
    icon: Map,
    title: 'Security Strategy & Roadmap',
    description: 'Develop comprehensive security strategies aligned with business objectives, creating actionable roadmaps for long-term success.',
    color: 'text-blue-600'
  },
  {
    icon: Shield,
    title: 'Risk Assessment & Management',
    description: 'Identify, evaluate, and prioritise security risks with continuous monitoring and mitigation strategies tailored to your organisation.',
    color: 'text-cyan-600'
  },
  {
    icon: FileCheck,
    title: 'Compliance & Governance',
    description: 'Ensure adherence to regulatory requirements including GDPR, ISO 27001, Cyber Essentials, and industry-specific standards.',
    color: 'text-blue-600'
  },
  {
    icon: AlertTriangle,
    title: 'Incident Response Planning',
    description: 'Prepare for security incidents with robust response plans, regular testing, and crisis management protocols.',
    color: 'text-cyan-600'
  },
  {
    icon: Users,
    title: 'Security Team Leadership',
    description: 'Provide direction, mentorship, and oversight to your internal security teams, building capability and expertise.',
    color: 'text-blue-600'
  },
  {
    icon: Presentation,
    title: 'Board-Level Reporting',
    description: 'Deliver clear, executive-focused reporting on security posture, risks, and strategic initiatives to leadership and stakeholders.',
    color: 'text-cyan-600'
  }
];

const VCISOServices = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            Our <span className="gradient-text">Service Offerings</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive cybersecurity leadership and expertise across all critical domains.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="feature-card-border rounded-xl p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col"
              >
                <Icon className={`h-12 w-12 ${service.color} mb-4`} />
                <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed flex-grow">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VCISOServices;