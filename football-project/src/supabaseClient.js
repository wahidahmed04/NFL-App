import { createClient, processLock } from '@supabase/supabase-js'

const supabaseUrl = 'https://fybglfapfnjdkwafluml.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5YmdsZmFwZm5qZGt3YWZsdW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjMxNzgsImV4cCI6MjA3NzU5OTE3OH0.nThsKmlrB-dpR_IRhwPdd1iNJyy2FS4cvmphGksx058'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)