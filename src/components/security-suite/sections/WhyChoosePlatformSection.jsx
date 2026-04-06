import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Users, BarChart3, FileText } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: "Compliance Automation",
    description: "Streamline assessments for ISO 27001, NIST, DORA, and more with our intuitive tools."
  },
  {
    icon: Users,
    title: "Vendor Risk Management",
    description: "Assess, monitor, and mitigate risks associated with your third-party vendors effectively."
  },
  {
    icon: BarChart3,
    title: "Insightful Dashboards",
    description: "Visualise your compliance and vendor risk posture at a glance with dynamic charts."
  },
  {
    icon: FileText,
    title: "Professional Reports",
    description: "Generate comprehensive PDF reports for stakeholders and auditors in minutes."
  }
];

const WhyChoosePlatformSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            Why Choose <span className="gradient-text">Our Platform?</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We provide a unified solution to effectively navigate the complex landscape of cyber regulations and third-party risks.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} className="feature-card-border rounded-xl p-8 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group shadow-lg">
              <feature.icon className="h-12 w-12 text-blue-600 mb-6 group-hover:text-cyan-600 transition-colors" />
              <h3 className="text-2xl font-bold mb-4 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoosePlatformSection;