import React, { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/customSupabaseClient';
    import { Loader2, Database } from 'lucide-react';

    const SetupCalendarTable = ({ onSetupComplete }) => {
      const [loading, setLoading] = useState(false);
      const { toast } = useToast();

      const handleCreateTable = async () => {
        setLoading(true);
        try {
          // This is a placeholder for the actual RPC call once Supabase is connected.
          // The function should be created in the Supabase dashboard SQL editor.
          const { error } = await supabase.rpc('create_manual_security_events_table');

          if (error) {
            throw error;
          }

          toast({
            title: 'Success!',
            description: 'The calendar events table has been created.',
          });
          onSetupComplete();
        } catch (error) {
          console.error('Error creating table:', error);
          toast({
            title: 'Error Creating Table',
            description: 'Could not create the table. Ensure you have created the `create_manual_security_events_table` function in your Supabase SQL editor.',
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
          <Card className="max-w-lg w-full text-center shadow-2xl">
            <CardHeader>
              <div className="mx-auto bg-blue-100 p-4 rounded-full w-fit">
                <Database className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="mt-4 text-2xl">One-Time Setup Required</CardTitle>
              <CardDescription>
                To use the Security Operations Console, a dedicated table for manual events needs to be created in your database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-6">
                This is a one-time action and will not affect any of your existing data. Click the button below to set up the feature.
              </p>
              <Button onClick={handleCreateTable} disabled={loading} size="lg" className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  'Complete Setup'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    };

    export default SetupCalendarTable;