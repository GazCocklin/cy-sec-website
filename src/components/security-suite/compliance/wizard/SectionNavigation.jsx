import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';

const SectionNavigation = ({ sections, questions, responses, currentQuestion, onSectionSelect }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-4 text-slate-800 px-4">Framework Sections</h3>
      {sections.map((section) => {
        const sectionQuestions = (questions || []).filter(q => q.section_code === section.code);
        const answeredCount = sectionQuestions.filter(q => responses[q.id] && responses[q.id] !== '').length;
        const progress = sectionQuestions.length > 0 ? (answeredCount / sectionQuestions.length) * 100 : 0;
        const isActive = currentQuestion?.section_code === section.code;

        return (
          <div
            key={section.code}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              isActive ? 'bg-blue-100 border-l-4 border-blue-500 shadow-sm' : 'hover:bg-slate-50'
            }`}
            onClick={() => onSectionSelect(section.code)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`font-semibold text-sm ${isActive ? 'text-blue-800' : 'text-slate-700'}`}>
                {section.code}
              </span>
              {progress === 100 && <CheckCircle className="h-4 w-4 text-green-500" />}
            </div>
            <p className={`text-xs ${isActive ? 'text-blue-700' : 'text-slate-500'} mb-2`}>{section.title}</p>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                {answeredCount}/{sectionQuestions.length} Complete
              </span>
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-slate-600'}`}>
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        );
      })}
    </div>
  );
};

export default SectionNavigation;