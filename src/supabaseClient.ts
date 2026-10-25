import { createClient } from '@supabase/supabase-js'

// Replace these placeholders with your actual keys from Supabase Settings > API
const supabaseUrl = 'https://hpnzsbqrncvmglyxhtvk.supabase.co'
const supabaseAnonKey = 'sb_publishable_Fx8NJ75X9D7khrkRD5gbLA_kXy5a4bM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
