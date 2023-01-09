import { json, redirect } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { prismaGetUser } from '~/utils/prisma/users.server'
import { createServerClient } from '~/utils/supabase.server'

export const loader = async ({ request }) => {
  // We can retrieve the session on the server and hand it to the client.
  // This is used to make sure the session is available immediately upon rendering
  const response = new Response()
  const supabase = createServerClient({ request, response })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login', {
      headers: response.headers,
    })
  }

  const authUser = {
    ...((await prismaGetUser({ id: user.id })) ?? {}),
    email: user.email,
  }

  return json(
    {
      user: authUser,
    },
    {
      headers: response.headers,
    }
  )
}

export default function AuthRequired() {
  const { user } = useLoaderData()
  return <Outlet context={{ user }} />
}
