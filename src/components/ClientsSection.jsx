import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: 'BCS',            sub: 'The Chartered Institute for IT' },
  { name: 'CompTIA',        sub: 'Authorized Training Partner' },
  { name: 'Masterschool',   sub: 'Training Partner' },
  { name: 'Firebrand',      sub: 'Training Partner' },
  { name: 'Learning People',sub: 'Training Partner' },
];

const ClientsSection = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} className="text-center mb-14">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
          Trusted By <span className="gradient-text">Leading</span> Organisations
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          We partner with industry leaders to deliver world-class cybersecurity training and services.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {clients.map((c, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200
                       shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group text-center">
            <span className="text-slate-800 font-bold text-lg group-hover:text-blue-600 transition-colors duration-200">
              {c.name}
            </span>
            <span className="text-slate-400 text-xs mt-1 leading-tight">{c.sub}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ClientsSection;
