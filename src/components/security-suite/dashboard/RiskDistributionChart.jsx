import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ShieldAlert, AlertTriangle, ShieldCheck, ShieldQuestion } from 'lucide-react';

const AnimatedNumber = ({ value }) => {
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    });
  }, [value, controls]);

  return (
    <motion.span
      initial={{ opacity: 0, y: -10 }}
      animate={controls}
      key={value}
    >
      {value}
    </motion.span>
  );
};

const RiskRow = ({ icon, label, color, count, percentage, delay }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      width: `${percentage}%`,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 + delay * 0.1 }
    });
  }, [percentage, controls, delay]);

  return (
    <motion.div
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <div className="flex-shrink-0 w-12 flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium text-slate-600">{label}</span>
      </div>
      <div className="flex-grow">
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <motion.div
            className={`h-2.5 rounded-full ${color}`}
            initial={{ width: '0%' }}
            animate={controls}
          />
        </div>
      </div>
      <div className="w-20 text-right">
        <span className="text-sm font-semibold text-slate-800"><AnimatedNumber value={count} /></span>
        <span className="text-xs text-slate-500 ml-1">({percentage.toFixed(0)}%)</span>
      </div>
    </motion.div>
  );
};

const RiskDistributionChart = ({ riskCounts, totalRisks }) => {
  const riskLevels = [
    { name: 'critical', label: 'Crit', color: 'bg-red-600', icon: <ShieldAlert className="h-5 w-5 text-red-600" /> },
    { name: 'high', label: 'High', color: 'bg-orange-500', icon: <ShieldAlert className="h-5 w-5 text-orange-500" /> },
    { name: 'medium', label: 'Med', color: 'bg-yellow-400', icon: <AlertTriangle className="h-5 w-5 text-yellow-400" /> },
    { name: 'low', label: 'Low', color: 'bg-blue-500', icon: <ShieldCheck className="h-5 w-5 text-blue-500" /> },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Total Risks</h3>
        <p className="text-3xl font-bold text-slate-900">
          <AnimatedNumber value={totalRisks} />
        </p>
      </div>
      <div className="space-y-3">
        {riskLevels.map((level, index) => {
          const count = riskCounts[level.name] || 0;
          const percentage = totalRisks > 0 ? (count / totalRisks) * 100 : 0;
          return (
            <RiskRow
              key={level.name}
              icon={level.icon}
              label={level.label}
              color={level.color}
              count={count}
              percentage={percentage}
              delay={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RiskDistributionChart;