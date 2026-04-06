import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, User, Building, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const SubmissionDetails = ({ submission, onStatusUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Submission Details</CardTitle>
        <CardDescription>
          {submission ? 'View and manage submission' : 'Select a submission to view details'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submission ? (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-slate-800 mb-3">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">{submission.name}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <a 
                    href={`mailto:${submission.email}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {submission.email}
                  </a>
                </div>
                {submission.company && (
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm">{submission.company}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm">
                    {new Date(submission.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-800 mb-3">Message</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {submission.message}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-800 mb-3">Status Management</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={submission.status === 'new' ? 'default' : 'outline'}
                  onClick={() => onStatusUpdate(submission.id, 'new')}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  New
                </Button>
                <Button
                  size="sm"
                  variant={submission.status === 'in_progress' ? 'default' : 'outline'}
                  onClick={() => onStatusUpdate(submission.id, 'in_progress')}
                >
                  <AlertCircle className="h-3 w-3 mr-1" />
                  In Progress
                </Button>
                <Button
                  size="sm"
                  variant={submission.status === 'completed' ? 'default' : 'outline'}
                  onClick={() => onStatusUpdate(submission.id, 'completed')}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-800 mb-3">Quick Actions</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const subject = `Re: Your inquiry - ${submission.name}`;
                    const body = `Hi ${submission.name},\n\nThank you for contacting Cy-Sec. We have received your message:\n\n"${submission.message}"\n\nBest regards,\nCy-Sec Team`;
                    window.open(`mailto:${submission.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
                  }}
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Reply via Email
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p>Select a submission from the list to view details</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubmissionDetails;