import React from 'react';
import { motion } from 'framer-motion';

const WhyCySecSection = () => {
  const columns = [
    {
      title: "Training + Compliance, Combined",
      description: "Unlike point solutions, Cy-Sec delivers certified training AND compliance automation AND vCISO leadership — all from one trusted partner."
    },
    {
      title: "FortifyOne Included",
      description: "Every vCISO engagement includes access to FortifyOne — our compliance platform covering ISO 27001, NIST CSF 2.0, DORA, NIS2 and more. Competitors charge extra."
    },
    {
      title: "Fixed Prices. No Surprises.",
      description: "DORA Sprint from £4,000. NIS2 Review from £2,500. vCISO from £995/month. Know exactly what you're paying before you commit."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A1E3F] text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why <span className="text-[#00D9FF]">Cy-Sec?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {columns.map((col, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-[#00D9FF]">
                {col.title}
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                {col.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCySecSection;