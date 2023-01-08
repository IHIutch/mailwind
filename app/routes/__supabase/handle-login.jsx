import { redirect } from '@remix-run/node'
import { createServerClient } from '~/utils/supabase.server'
import { Loader2 } from 'lucide-react'

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
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex items-center">
        <Loader2 className="h-5 w-5 animate-spin mr-3" />
        <p className="font-semibold">Logging in...</p>
      </div>
    </div>
  )
}
