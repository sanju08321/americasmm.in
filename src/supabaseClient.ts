import { createClient } from '@supabase/supabase-js'

// Replace these placeholders with your actual keys from Supabase Settings > API
const supabaseUrl = 'https://supabase.co'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
