import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedCounter = ({ from, to, duration, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = null;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const StatsBar = () => {
  const stats = [
    { number: 1000, suffix: "+", label: "STUDENTS TRAINED" },
    { number: 10, suffix: "+", label: "COUNTRIES" },
    { number: 6, suffix: "", label: "COMPLIANCE FRAMEWORKS" },
    { prefix: "From £", number: 995, suffix: "/month", label: "VCISO" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-[#00D9FF] to-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-[#0A1E3F]"
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2">
                <AnimatedCounter 
                  from={0} 
                  to={stat.number} 
                  duration={2} 
                  suffix={stat.suffix} 
                  prefix={stat.prefix || ""}
                />
              </div>
              <div className="text-sm md:text-base font-semibold uppercase tracking-wider opacity-80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;