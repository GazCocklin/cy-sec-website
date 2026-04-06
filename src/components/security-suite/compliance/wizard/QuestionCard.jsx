import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, FileText, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const QuestionCard = ({ question, response, notes, onResponseChange, onNotesChange, onNotesBlur }) => {
  const { toast } = useToast();

  const parseOptions = (optionsData) => {
    if (!optionsData) return [];
    try {
      const parsed = typeof optionsData === 'string' ? JSON.parse(optionsData) : optionsData;
      if (Array.isArray(parsed) && parsed.every(item => typeof item === 'object' && item !== null && 'label' in item && 'value' in item)) {
        return parsed;
      }
      if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
        return parsed.map(item => ({ label: item, value: item }));
      }
      return [];
    } catch (error) {
      console.error('Error parsing options:', error);
      return [];
    }
  };
  
  const handleEvidenceUpload = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Evidence upload functionality will be available in a future update.",
    });
  };

  if (!question) return <div className="p-6">No question to display.</div>;

  const options = parseOptions(question.options);

  return (
    <Card className="border-2 flex-grow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-3 text-gray-900">
              {question.question_number}: {question.question_text}
            </CardTitle>
            {question.guidance_text && (
              <CardDescription className="text-base text-gray-700 bg-blue-50 p-4 rounded-lg">
                <strong>Guidance:</strong> {question.guidance_text}
              </CardDescription>
            )}
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Badge variant={question.risk_level === 'critical' ? 'destructive' : 'secondary'}>
              {question.risk_level} risk
            </Badge>
            {question.evidence_required && (
              <Badge variant="outline">
                <FileText className="h-3 w-3 mr-1" />
                Evidence Required
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-lg">Select your response:</h4>
          {options.map((option, index) => (
            <label
              key={index}
              className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                response === option.value
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.value}
                checked={response === option.value}
                onChange={(e) => onResponseChange(question.id, e.target.value)}
                className="mt-1 mr-4 scale-125"
              />
              <span className="flex-1 text-sm font-medium">{option.label}</span>
              {response === option.value && <CheckCircle className="h-5 w-5 text-blue-600 ml-2" />}
            </label>
          ))}
        </div>

        <div className="space-y-3">
          <label className="font-semibold text-lg">Additional Notes & Evidence Details</label>
          <Textarea
            placeholder="Provide context, implementation details, or describe evidence here..."
            value={notes || ''}
            onChange={(e) => onNotesChange(question.id, e.target.value)}
            onBlur={() => onNotesBlur(question.id)}
            className="min-h-[120px] text-base bg-white text-slate-800 border-slate-300"
          />
        </div>

        {question.evidence_required && (
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center bg-blue-50">
            <Upload className="h-10 w-10 text-blue-500 mx-auto mb-3" />
            <h4 className="font-semibold text-blue-900 mb-2">Evidence Upload</h4>
            <p className="text-blue-700 mb-4">Upload supporting documentation for this requirement.</p>
            <Button variant="outline" onClick={handleEvidenceUpload} className="border-blue-300 text-blue-700 hover:bg-blue-100">
              <Upload className="h-4 w-4 mr-2" />
              Upload Evidence Files
            </Button>
            <p className="text-xs text-blue-600 mt-2">Supported: PDF, DOCX, PNG, JPG (Max 10MB)</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;