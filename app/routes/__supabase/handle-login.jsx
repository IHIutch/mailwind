import { redirect } from '@remix-run/node'
import { createServerClient } from '~/utils/supabase.server'

export const loader = async ({ request }) => {
  const response = new Response()
  const supabase = createServerClient({ request, response })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    return redirect('/profile')
  }

  return null
}

export default function HandleLogin() {
  return <div>Logging in...</div>
}
