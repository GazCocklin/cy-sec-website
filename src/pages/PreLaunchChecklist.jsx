import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, X, ClipboardList, Globe, User, ShieldCheck, UserCog, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';

const getStatusStyles = (status) => {
  switch (status) {
    case 'yes':
      return 'bg-green-50 border-l-4 border-green-500';
    case 'no':
      return 'bg-red-50 border-l-4 border-red-500';
    default:
      return 'bg-slate-50';
  }
};

const ChecklistItem = ({ id, label, description, onStatusChange, status, onNotesChange, notes }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex flex-col gap-4 p-4 rounded-lg transition-colors ${getStatusStyles(status)}`}
  >
    <div className="flex items-start gap-4">
      <div className="flex-grow grid gap-1.5 leading-none">
        <Label htmlFor={id} className="font-medium text-slate-800">
          {label}
        </Label>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>
      <div className="flex gap-2">
        <Button
          size="icon"
          variant={status === 'yes' ? 'default' : 'outline'}
          className="bg-green-500 hover:bg-green-600 text-white data-[state=checked]:bg-green-600"
          onClick={() => onStatusChange(id, 'yes')}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={status === 'no' ? 'destructive' : 'outline'}
          onClick={() => onStatusChange(id, 'no')}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
    {status === 'no' && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        className="pl-4"
      >
        <Label htmlFor={`notes-${id}`} className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700">
          <MessageSquare className="h-4 w-4" />
          Notes (describe the issue):
        </Label>
        <Textarea
          id={`notes-${id}`}
          placeholder="e.g., The contact form gave a 'failed to send' error."
          value={notes}
          onChange={(e) => onNotesChange(id, e.target.value)}
          className="bg-white"
        />
      </motion.div>
    )}
  </motion.div>
);

const PreLaunchChecklist = () => {
  const checklistData = {
    publicWebsite: [
      { id: 'home-nav', label: 'Navigate Homepage', description: 'Click all navigation links (Training, Security Suite, etc.) and ensure they go to the correct pages.' },
      { id: 'contact-form', label: 'Submit Contact Form', description: 'Fill out and submit the contact form. Check if the submission appears in the admin dashboard.' },
      { id: 'footer-links', label: 'Check Footer Links', description: 'Verify that Privacy Policy and Terms of Service links work.' },
    ],
    authentication: [
      { id: 'signup', label: 'Create a New User Account', description: 'Use a new email to sign up through the Security Suite login page.' },
      { id: 'login', label: 'Log In with New User', description: 'After verifying the email, log in with the newly created account.' },
      { id: 'logout', label: 'Log Out', description: 'Ensure the logout button in the settings page works correctly.' },
    ],
    securitySuite: [
      { id: 'ss-dashboard', label: 'Access Security Suite Dashboard', description: 'After logging in, confirm you land on the main dashboard.' },
      { id: 'ss-create-assessment', label: 'Create a New Assessment', description: 'Go to Compliance Assessments and create a new one (e.g., NIST CSF).' },
      { id: 'ss-complete-wizard', label: 'Complete Assessment Wizard', description: 'Go through the entire wizard, answering all questions.' },
      { id: 'ss-view-report', label: 'View Assessment Report', description: 'After completion, check that the report page displays correctly with scores.' },
      { id: 'ss-download-pdf', label: 'Download PDF Report', description: 'Click "Download PDF". Test for both a Foundation and Business user to see the different templates.' },
      { id: 'ss-download-excel', label: 'Download Excel Risk Report', description: 'Click "Export Risks" and verify the Excel file downloads with the correct data.' },
      { id: 'ss-update-settings', label: 'Update Profile Settings', description: 'Go to Settings and update your profile information.' },
    ],
    adminDashboard: [
      { id: 'admin-login', label: 'Log In as Administrator', description: 'Log in with an admin account (e.g., gazc@cy-sec.co.uk).' },
      { id: 'admin-view-contacts', label: 'View Contact Submissions', description: 'Check that the contact form submission from the test appears here.' },
      { id: 'admin-view-users', label: 'View User Management', description: 'Find the new user you created. Check if email is visible.' },
      { id: 'admin-assign-plan', label: 'Assign a Plan to User', description: 'Assign the "Business Suite" plan to your test user.' },
      { id: 'admin-revoke-plan', label: 'Revoke a Plan from User', description: 'Revoke the "Business Suite" plan and ensure it is removed.' },
      { id: 'admin-check-permissions', label: 'Verify Plan Permissions', description: 'After assigning a plan, log back in as the test user and see if their accessible modules have updated.' },
    ],
  };

  const [itemStatuses, setItemStatuses] = useState({});
  const [itemNotes, setItemNotes] = useState({});

  const handleStatusChange = (id, status) => {
    setItemStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const handleNotesChange = (id, notes) => {
    setItemNotes((prev) => ({ ...prev, [id]: notes }));
  };

  const allItems = [].concat(...Object.values(checklistData));
  const completedCount = Object.values(itemStatuses).filter(status => status === 'yes' || status === 'no').length;
  const progress = allItems.length > 0 ? Math.round((completedCount / allItems.length) * 100) : 0;

  const Section = ({ title, icon: Icon, items, sectionKey }) => (
    <AccordionItem value={sectionKey}>
      <AccordionTrigger className="text-lg font-semibold hover:no-underline">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-blue-600" />
          {title}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pt-2">
          {items.map((item) => (
            <ChecklistItem
              key={item.id}
              id={item.id}
              label={item.label}
              description={item.description}
              status={itemStatuses[item.id]}
              onStatusChange={handleStatusChange}
              notes={itemNotes[item.id] || ''}
              onNotesChange={handleNotesChange}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <>
      <Helmet>
        <title>Pre-Launch Checklist - Cy-Sec Admin</title>
      </Helmet>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <ClipboardList className="h-10 w-10 text-blue-600" />
                  <div>
                    <CardTitle className="text-3xl font-bold text-slate-800">Pre-Launch Test Checklist</CardTitle>
                    <CardDescription className="text-lg text-slate-600">
                      A complete guide to testing your website's functionality before going live.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Overall Progress</span>
                    <span className="text-blue-600">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                  <p className="text-center text-sm text-slate-500">{completedCount} of {allItems.length} tasks completed</p>
                </div>

                <Accordion type="multiple" defaultValue={['publicWebsite', 'authentication']} className="w-full">
                  <Section title="Public Website" icon={Globe} items={checklistData.publicWebsite} sectionKey="publicWebsite" />
                  <Section title="User Authentication" icon={User} items={checklistData.authentication} sectionKey="authentication" />
                  <Section title="Security Suite Features" icon={ShieldCheck} items={checklistData.securitySuite} sectionKey="securitySuite" />
                  <Section title="Admin Dashboard" icon={UserCog} items={checklistData.adminDashboard} sectionKey="adminDashboard" />
                </Accordion>
                
                {progress === 100 && (
                   <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-8 text-center p-6 bg-green-100 border-2 border-dashed border-green-400 rounded-lg"
                    >
                      <Check className="h-12 w-12 text-green-600 mx-auto mb-3" />
                      <h3 className="text-2xl font-bold text-green-800">All Tests Completed!</h3>
                      <p className="text-green-700 mt-2">Congratulations! You've successfully tested all key features. The website is ready for launch!</p>
                   </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PreLaunchChecklist;