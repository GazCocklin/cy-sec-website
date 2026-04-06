import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aixxbakynzjkdezzklbk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpeHhiYWt5bnpqa2RlenprbGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NTE1OTcsImV4cCI6MjA2NjQyNzU5N30.7pCylgzJMHQGjOGr8ZY2CO_xB-wOlRVI_YUfww77nkM';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
