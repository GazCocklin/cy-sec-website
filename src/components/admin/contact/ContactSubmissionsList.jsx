import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const ContactSubmissionsList = ({ 
  submissions, 
  selectedSubmission, 
  setSelectedSubmission 
}) => {

  const getInitials = (name) => {
    if (!name) return '??';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[1]) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="max-h-[65vh] overflow-y-auto pr-1">
          {submissions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No submissions found.
            </div>
          ) : (
            submissions.map((submission) => (
              <div
                key={submission.id}
                onClick={() => setSelectedSubmission(submission)}
                className={`p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedSubmission?.id === submission.id 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white hover:bg-slate-50 hover:shadow-md border border-slate-200/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    selectedSubmission?.id === submission.id ? 'bg-white text-blue-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {getInitials(submission.name)}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold truncate ${selectedSubmission?.id === submission.id ? 'text-white' : 'text-slate-800'}`}>
                        {submission.name}
                      </h3>
                      {submission.admin_notes && submission.admin_notes.length > 0 && (
                        <div className={`flex items-center text-xs ${selectedSubmission?.id === submission.id ? 'text-blue-100' : 'text-blue-600'}`}>
                          <MessageSquare className="h-3 w-3 mr-1" />
                          <span>{submission.admin_notes.length}</span>
                        </div>
                      )}
                    </div>
                    <p className={`text-sm truncate ${selectedSubmission?.id === submission.id ? 'text-blue-100' : 'text-gray-600'}`}>
                      {submission.email}
                    </p>
                    <p className={`text-xs mt-1 ${selectedSubmission?.id === submission.id ? 'text-blue-200' : 'text-gray-400'}`}>
                      {new Date(submission.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSubmissionsList;