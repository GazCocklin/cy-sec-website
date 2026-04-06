import React from 'react';
import AssessmentCard from './AssessmentCard';
import { motion } from 'framer-motion';

const AssessmentsList = ({ assessments, onOpenWizard, onDelete }) => {
  if (!assessments || assessments.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-100 rounded-lg">
        <p className="text-xl font-semibold text-slate-700">No assessments found.</p>
        <p className="text-slate-500 mt-2">Start a new assessment to see it here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assessments.map((assessment, index) => (
        <motion.div
          key={assessment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <AssessmentCard assessment={assessment} onOpenWizard={onOpenWizard} onDelete={onDelete} />
        </motion.div>
      ))}
    </div>
  );
};

export default AssessmentsList;