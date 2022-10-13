import { createClient } from '@supabase/supabase-js'
import { getSession } from '../session.server'

// see documention about using .env variables
// https://remix.run/docs/en/v1/guides/envvars#server-environment-variables
const isServer = typeof window === 'undefined'

const supabaseUrl = isServer
  ? process.env.SUPABASE_URL
  : window.env.SUPABASE_URL

const supabaseAnonKey = isServer
  ? process.env.SUPABASE_KEY
  : window.env.SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
