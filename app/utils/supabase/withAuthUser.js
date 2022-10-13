import { redirect } from '@remix-run/node'
import { supabase } from '~/utils/supabase'
import { prismaGetUser } from '../prisma/users.server'
import { getSession } from '../session.server'

const withAuthUser = (fn) => async (context) => {
  try {
    const session = await getSession(context.request.headers.get('Cookie'))
    if (!session.has('accessToken')) throw Error('No session')
    const accessToken = session.get('accessToken')

    const { user: sessionUser } = await supabase.auth.api.getUser(accessToken)
    if (!sessionUser) throw Error('Auth user not found')

    const user = await prismaGetUser({ id: sessionUser.id })
    if (!user) throw Error('Public user not found')

    supabase.auth.setAuth(session.get('accessToken'))

    return fn({
      ...context,
      authUser: {
        email: sessionUser.email,
        ...user,
      },
      supabaseClient: supabase,
    })
  } catch (error) {
    console.log({ error2: error })
    return redirect('/login')
  }
}

export default withAuthUser
