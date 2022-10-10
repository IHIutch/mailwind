import { redirect, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getSession } from '~/utils/session.server'
import { supabase } from '~/utils/supabase'

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))

  // if there is no access token in the header then
  // the user is not authenticated, go to login
  if (!session.has('access_token')) {
    return redirect(`/login`)
  } else {
    // otherwise execute the query for the page, but first get token
    const { user, error } = await supabase.auth.api.getUser(
      session.get('access_token')
    )

    let userData = {}
    let sbError = ''

    const { data, error: selectError } = await supabase
      .from('users')
      .select('*')
      .match({ id: user.id })
      .single()

    userData = data
    sbError = selectError

    if (!userData) {
      const { data: newUser, error: createError } = await supabase
        .from('cities')
        .insert([{ id: user.id }])

      userData = newUser
      sbError = createError
    }

    // if no error then get then set authenticated session
    // to match the user associated with the access_token
    if (error || sbError) {
      return json({ error: error || sbError })
    } else {
      // activate the session with the auth_token
      supabase.auth.setAuth(session.get('access_token'))
      // return data and any potential errors along with user
      return json({
        user: {
          email: user.email,
          ...data,
        },
      })
    }
  }
}

export default function Profile() {
  const { user } = useLoaderData()
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
