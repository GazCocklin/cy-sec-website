import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: 'BCS',            subtitle: 'The Chartered Institute for IT', color: '#003F7F' },
  { name: 'CompTIA',        subtitle: 'Authorized Training Partner',    color: '#E8001C' },
  { name: 'Masterschool',   subtitle: 'Training Partner',               color: '#1A1A2E' },
  { name: 'Firebrand',      subtitle: 'Training Partner',               color: '#E63900' },
  { name: 'Learning People',subtitle: 'Training Partner',               color: '#1B4F72' },
];

const ClientsSection = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }} className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
          Trusted By <span className="gradient-text">Leading</span> Organisations
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          We are proud to partner with businesses of all sizes, helping them navigate
          the complex landscape of cybersecurity.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
        {clients.map((c, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
            className="flex flex-col justify-center items-center h-28 rounded-xl shadow-md
                       grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
            style={{ background: c.color }}>
            <span style={{ color: 'white', fontFamily: 'Inter, Arial, sans-serif',
              fontSize: '14px', fontWeight: '800', textAlign: 'center', padding: '0 10px' }}>
              {c.name}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, Arial, sans-serif',
              fontSize: '9px', fontWeight: '400', textAlign: 'center', padding: '3px 10px 0', letterSpacing: '0.3px' }}>
              {c.subtitle}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ClientsSection;
