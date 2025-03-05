import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mgsojpxcsvpwezicwtqj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nc29qcGxjc3Zwd2V6aWN3dHFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3MjYxNjMsImV4cCI6MjAyMDMwMjE2M30.0000000000000000000000000000000000000000';

export const supabase = createClient(supabaseUrl, supabaseKey, {
    realtime: {
        params: {
            eventsPerSecond: 10
        }
    }
}); 