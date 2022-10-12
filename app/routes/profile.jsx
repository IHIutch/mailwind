import { redirect, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prismaGetUser } from '~/utils/prisma/users.server'
import { getSession, registerUser } from '~/utils/session.server'
import { supabase } from '~/utils/supabase'

export const loader = async ({ request }) => {
  try {
    const session = await getSession(request.headers.get('Cookie'))

    if (!session.has('access_token')) {
      return redirect(`/login`)
    } else {
      const { user: sessionUser, error } = await supabase.auth.api.getUser(
        session.get('access_token')
      )
      if (error) {
        throw new Error(error.message)
      }

      let user = await prismaGetUser({ id: sessionUser.id })
      if (!user) {
        user = await registerUser({
          email: sessionUser.email,
          id: sessionUser.id,
        })
      }

      supabase.auth.setAuth(session.get('access_token'))

      return json({
        user: {
          email: user.email,
          ...user,
        },
      })
    }
  } catch (error) {
    return json({ error: error.message }, 400)
  }
}

export default function Profile() {
  const { user, error } = useLoaderData()
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div>{error ? error : null}</div>
    </div>
  )
}
