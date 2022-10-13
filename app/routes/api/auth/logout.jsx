import { redirect } from '@remix-run/node'
import { destroySession, getSession } from '~/utils/session.server'

export async function action({ request }) {
  try {
    const session = await getSession(request.headers.get('Cookie'))

    return redirect('/login', {
      headers: { 'Set-Cookie': await destroySession(session) },
    })
  } catch (error) {
    return { error: error.message }
  }
}
