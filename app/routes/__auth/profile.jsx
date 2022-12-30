import { redirect, json } from '@remix-run/node'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import { createServerClient } from '~/utils/supabase.server'

export const loader = async ({ request }) => {
  // in order for the set-cookie header to be set,
  // headers must be returned as part of the loader response
  const response = new Response()
  const supabase = createServerClient({ request, response })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return redirect('/login')
  }

  return json(
    { data: { blah: '' } },
    {
      headers: response.headers,
    }
  )
}

export default function Profile() {
  const { data } = useLoaderData()
  const { supabase, authUser } = useOutletContext()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log({ error })
    }
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <pre>{JSON.stringify({ data, authUser }, null, 2)}</pre>;
    </div>
  )
}
