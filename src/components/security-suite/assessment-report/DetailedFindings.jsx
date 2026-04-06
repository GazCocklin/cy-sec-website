import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DetailedFindings = ({ responses, questions }) => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };
  
  const getScoreColour = (score) => score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600';

  const findings = responses.map(response => {
    const question = questions.find(q => q.id === response.question_id);
    return { ...response, question: question || {} };
  }).sort((a,b) => (a.score || 0) - (b.score || 0));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Findings</CardTitle>
        <CardDescription>A complete list of all assessed controls and their status.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {findings.map(item => (
            <div key={item.id} className="border rounded-lg">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50"
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex-1 pr-4">
                  <p className="font-semibold text-slate-800">{item.question.question_number}: {item.question.question_text}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-bold text-lg ${getScoreColour(item.score)}`}>{item.score}%</span>
                  {openItem === item.id ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>
              {openItem === item.id && (
                <div className="p-4 border-t bg-slate-50">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm">Response</h4>
                      <p className="text-slate-700 text-sm">{item.response_value}</p>
                    </div>
                    {item.notes && (
                      <div>
                        <h4 className="font-semibold text-sm">Notes</h4>
                        <p className="text-slate-700 text-sm whitespace-pre-wrap">{item.notes}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-sm">Risk Rating</h4>
                      <p className="text-slate-700 text-sm capitalize">{item.risk_rating}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedFindings;