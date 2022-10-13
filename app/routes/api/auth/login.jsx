import { json, redirect } from '@remix-run/node'
import { prismaGetUser } from '~/utils/prisma/users.server'
import { commitSession, getSession, registerUser } from '~/utils/session.server'
import { supabase } from '~/utils/supabase'

export async function action({ request }) {
  try {
    const formData = await request.formData()

    const { accessToken } = Object.fromEntries(formData)
    const session = await getSession(request.headers.get('Cookie'))

    session.set('accessToken', accessToken)

    const { user: sessionUser, error } = await supabase.auth.api.getUser(
      accessToken
    )

    if (error) throw new Error(error.message)

    const user = await prismaGetUser({ id: sessionUser.id })
    if (!user) {
      await registerUser({
        email: sessionUser.email,
        id: sessionUser.id,
      })
    }

    // redirect to page with the cookie set in header
    return redirect('/profile', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  } catch (error) {
    return json({ error: error.message })
  }
}
