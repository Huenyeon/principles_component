import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gbotntyjxqtijwrtaueh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdib3RudHlqeHF0aWp3cnRhdWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMTA3NDEsImV4cCI6MjA1NjU4Njc0MX0.UW4UefGSZHpdcdjzznmB2w-alUVClBwauIQ_3AfgOlw';

export const supabase = createClient(supabaseUrl, supabaseKey);