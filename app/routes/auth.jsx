import { json, redirect } from '@remix-run/node'
import {
  commitSession,
  destroySession,
  getSession,
} from '~/utils/session.server'

export async function action({ request }) {
  try {
    const formData = await request.formData()
    const event = formData.get('event')
    const access_token = formData.get('access_token')
    const session = await getSession(request.headers.get('Cookie'))

    if (event === 'SIGNED_IN') {
      session.set('access_token', access_token)

      // redirect to page with the cookie set in header
      return redirect('/profile', {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      })
    } else if (event === 'SIGNED_OUT') {
      // destroy session and redirect to login page
      return redirect('/login', {
        headers: { 'Set-Cookie': await destroySession(session) },
      })
    } else {
      return json({ error: 'Something went wrong' })
    }
  } catch (error) {
    return json({ error: error.message }, 400)
  }
}
