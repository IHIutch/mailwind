import { redirect, json } from '@remix-run/node'
import {
  useLoaderData,
  Link,
  Form,
  useActionData,
  NavLink,
  useFetcher,
} from '@remix-run/react'
import { getSession } from '~/utils/session.server'
import { supabase } from '~/utils/supabase'

// https://remix.run/api/conventions#meta
export const meta = () => {
  return {
    title: 'Remix Supabase Starter',
    description: 'Welcome to remix! Login Page',
  }
}

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))

  // if there is no access token in the header then
  // the user is not authenticated, go to login
  if (session.has('access_token')) {
    const { user, error } = await supabase.auth.api.getUser(
      session.get('access_token')
    )
    if (user) {
      return redirect(`/profile`)
    }
    if (error) {
      return json({
        error: error || 'Authentication error: Something went wrong',
      })
    }
  }
  return json(null)
}

export const action = async ({ request }) => {
  // get user credentials from form
  const form = await request.formData()
  const email = form.get('email')

  // login using the credentials
  const { error } = await supabase.auth.signIn(
    { email },
    {
      redirectTo: 'http://localhost:3000/login',
    }
  )

  return { error }
}

// https://remix.run/guides/routing#index-routes
export default function Login() {
  const actionData = useActionData()
  const authFetcher = useFetcher()

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      authFetcher.submit(
        {
          event,
          access_token: session.access_token,
        },
        { method: 'post', action: '/auth' }
      )
    }
  })

  return (
    <div className="remix__page">
      <main>
        <h2 className="text-2xl font-bold">
          Welcome to Supabase Remix - Login Page
        </h2>
        <Form method="post">
          <div className="flex flex-1 flex-col items-center">
            <div className="form_item">
              <label htmlFor="email">EMAIL ADDRESS:</label>
              <input id="email" name="email" type="text" />
            </div>
            <div className="mt-8 flex flex-1 flex-row items-center">
              <button
                className="mr-4 w-fit rounded-sm bg-slate-500 px-8 text-white"
                type="submit"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </Form>
        <div>{actionData?.error ? actionData?.error?.message : null}</div>
      </main>
    </div>
  )
}
