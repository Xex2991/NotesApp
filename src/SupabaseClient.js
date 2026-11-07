import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xfdirmcdudmnijtlbwbp.supabase.co'

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmZGlybWNkdWRtbmlqdGxid2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1MjA2NzgsImV4cCI6MjEwOTA5NjY3OH0.7IYqK8rtnvLSXyYZ9EzjpLW7sN44NaG-YK8g8n11aww'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);