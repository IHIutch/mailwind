import { createServerClient as _createServerClient } from '@supabase/auth-helpers-remix'

export const createServerClient = ({ request, response }) =>
  _createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    request,
    response,
  })
