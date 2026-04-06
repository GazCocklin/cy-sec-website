import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Activity, CheckSquare, LayoutGrid, Users, Award, ArrowRight } from 'lucide-react';

const ServicesGrid = () => {
  const services = [
    {
      title: "Virtual CISO",
      description: "Dedicated cybersecurity leadership from £995/month. FortifyOne platform included.",
      icon: ShieldCheck,
      link: "/vciso",
    },
    {
      title: "DORA Compliance Sprint",
      description: "Get DORA-ready in weeks, not months. Fixed price from £4,000.",
      icon: Activity,
      link: "/dora-compliance",
    },
    {
      title: "NIS2 Compliance",
      description: "NIS2 is in force. Know your obligations and get compliant fast. From £2,500.",
      icon: CheckSquare,
      link: "/nis2-compliance",
    },
    {
      title: "FortifyOne Platform",
      description: "ISO 27001, NIST, NIS2, DORA, PCI-DSS compliance automation in one platform.",
      icon: LayoutGrid,
      link: "/security-suite",
    },
    {
      title: "Security Awareness Training",
      description: "Role-specific, bespoke cybersecurity training for your entire organisation.",
      icon: Users,
      link: "/training-delivery",
    },
    {
      title: "Professional Certifications",
      description: "CompTIA & CertNexus authorised training. Security+, CySA+, CASP+ and more.",
      icon: Award,
      link: "/training-delivery",
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Everything You Need. <span className="text-[#00D9FF] mix-blend-multiply">One Partner.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive services tailored to protect your organisation, train your staff, and achieve complex regulatory compliance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} to={service.link} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full border border-slate-100 flex flex-col"
              >
                <div className="w-14 h-14 rounded-lg bg-[#0A1E3F]/5 flex items-center justify-center mb-6 group-hover:bg-[#00D9FF]/10 transition-colors">
                  <service.icon className="h-7 w-7 text-[#0A1E3F] group-hover:text-[#00D9FF]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#0A1E3F] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center text-[#00D9FF] font-semibold mt-auto">
                  Learn more <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;