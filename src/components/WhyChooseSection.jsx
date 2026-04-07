import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Award, TrendingUp, BookOpen, Globe, LayoutGrid } from 'lucide-react';

const WhyChooseSection = () => {
  const stats = [
    { icon: TrendingUp, number: "100+", label: "Solutions Delivered" },
    { icon: BookOpen, number: "1000+", label: "Students" },
    { icon: Globe, number: "10+", label: "Countries" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Expert Protection",
      description: "Industry-leading security expertise with proven track record of protecting organisations."
    },
    {
      icon: Users,
      title: "Comprehensive Training",
      description: "Engaging awareness programmes that transform your team into your first line of defense."
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Measurable improvements in security posture and incident reduction rates."
    },
    {
      icon: LayoutGrid,
      title: "Integrated GRC Platform",
      description: "A unified platform for compliance assessments, vendor risk management, and security monitoring."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
            Why Choose <span className="gradient-text">Cy-Sec</span>?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
            We provide comprehensive cybersecurity solutions tailored to your organisation's unique needs.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="stats-highlight rounded-xl p-6 text-center">
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-800 mb-1">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="feature-card-border rounded-xl p-8 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 group shadow-lg flex flex-col"
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-6 group-hover:text-cyan-600 transition-colors" />
              <h3 className="text-2xl font-bold mb-4 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed flex-grow">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;