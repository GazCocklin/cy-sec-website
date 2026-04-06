import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar, Eye, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const getStatusIcon = (status) => {
  switch (status) {
    case 'new': return <Clock className="h-4 w-4" />;
    case 'in_progress': return <AlertCircle className="h-4 w-4" />;
    case 'completed': return <CheckCircle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-800';
    case 'in_progress': return 'bg-yellow-100 text-yellow-800';
    case 'completed': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const SubmissionsList = ({ submissions, selectedSubmission, onSubmissionSelect, totalCount }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Submissions ({totalCount})</CardTitle>
        <CardDescription>
          Click on a submission to view details
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {submissions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No submissions found matching your criteria.
            </div>
          ) : (
            submissions.map((submission) => (
              <div
                key={submission.id}
                onClick={() => onSubmissionSelect(submission)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedSubmission?.id === submission.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-slate-800">{submission.name}</h3>
                      <Badge className={`text-xs ${getStatusColor(submission.status)}`}>
                        {getStatusIcon(submission.status)}
                        <span className="ml-1">{submission.status.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{submission.email}</p>
                    {submission.company && (
                      <p className="text-sm text-gray-500 mb-2">
                        <Building className="h-3 w-3 inline mr-1" />
                        {submission.company}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {submission.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {new Date(submission.created_at).toLocaleString()}
                    </p>
                  </div>
                  <Eye className="h-4 w-4 text-gray-400 ml-2" />
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionsList;