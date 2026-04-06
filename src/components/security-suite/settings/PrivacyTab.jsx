import React from 'react';
import { Database, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const PrivacyTab = ({ exportData, deleteAccount }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Data & Privacy</h2>
      <div className="space-y-6">
        <div className="p-6 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Export Data</h3>
              <p className="text-slate-600">Download a copy of your data</p>
            </div>
            <Button
              variant="outline"
              onClick={exportData}
            >
              <Database className="h-4 w-4 mr-2" /> Export Data
            </Button>
          </div>
        </div>

        <div className="p-6 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-800">Delete Account</h3>
              <p className="text-red-600">Permanently delete your account and all data</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-slate-800">Delete Account</AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-600">
                    Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-slate-600">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={deleteAccount}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTab;