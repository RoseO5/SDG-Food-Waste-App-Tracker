import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://nfnljaimllvghybmzrwg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mbmxqYWltbGx2Z2h5Ym16cndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxOTg2MjAsImV4cCI6MjA3Nzc3NDYyMH0.gHFwF1Itnz5cIKbCCCr39WQMEgCz2Xo8fe4aotPHc4c";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
