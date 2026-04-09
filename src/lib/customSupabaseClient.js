import { createClient } from '@supabase/supabase-js';

// FortifyLearn Supabase project — shared auth across cy-sec.co.uk and fortifylearn.co.uk
const supabaseUrl = 'https://kmnbtnfgeadvvkwsdyml.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttbmJ0bmZnZWFkdnZrd3NkeW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTE4MTcsImV4cCI6MjA1OTc4NzgxN30.7ERa6sJbQj2mF3GWFHoSGKkx4urDBvgGGYxJqDfZdmk';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
