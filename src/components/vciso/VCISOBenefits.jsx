import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  DollarSign, 
  Zap, 
  Rocket, 
  Target, 
  Headphones 
} from 'lucide-react';

const benefits = [
  {
    icon: Award,
    title: 'Executive-Level Expertise',
    description: 'Access seasoned cybersecurity leaders with proven track records across multiple industries and security domains.',
    gradient: 'from-blue-600 to-cyan-600'
  },
  {
    icon: DollarSign,
    title: 'Cost-Effective Leadership',
    description: 'Gain C-suite security expertise without the salary, benefits, and overhead of a full-time executive hire.',
    gradient: 'from-cyan-600 to-blue-600'
  },
  {
    icon: Zap,
    title: 'Flexible Engagement',
    description: 'Scale our involvement based on your needs - from ongoing advisory to intensive project-based support.',
    gradient: 'from-blue-600 to-cyan-600'
  },
  {
    icon: Rocket,
    title: 'Rapid Deployment',
    description: 'Skip lengthy recruitment processes and start benefiting from expert security leadership immediately.',
    gradient: 'from-cyan-600 to-blue-600'
  },
  {
    icon: Target,
    title: 'Strategic Guidance',
    description: 'Align security initiatives with business goals through strategic planning and executive-level thinking.',
    gradient: 'from-blue-600 to-cyan-600'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Access to our team whenever you need us, with rapid response for critical security matters and incidents.',
    gradient: 'from-cyan-600 to-blue-600'
  }
];

const VCISOBenefits = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/80">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            Key <span className="gradient-text">Benefits</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Transform your security posture with flexible, expert leadership that delivers results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="feature-card-border rounded-xl p-8 bg-gradient-to-br from-white to-slate-50 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`h-14 w-14 rounded-lg bg-gradient-to-r ${benefit.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VCISOBenefits;