import { redirect, json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { createServerClient } from '~/utils/supabase.server'

// https://remix.run/api/conventions#meta
export const meta = () => {
  return {
    title: 'Remix Supabase Starter',
    description: 'Welcome to remix! Login Page',
  }
}

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

export const action = async ({ request }) => {
  try {
    const formData = await request.formData()
    const { email } = Object.fromEntries(formData)

    const response = new Response()
    const supabase = createServerClient({ request, response })

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:3000/handle-login',
      },
    })

    console.log({ data })

    if (error) throw Error(error.message)
    return null
  } catch (error) {
    return json(
      {
        error: {
          message: error.message,
        },
      },
      400
    )
  }
}

export default function Login() {
  const actionData = useActionData()

  return (
    <div>
      <main>
        <h2 className="text-2xl font-bold">
          Welcome to Supabase Remix - Login Page
        </h2>
        <Form method="post">
          <div className="flex flex-1 flex-col items-center">
            <div className="form_item">
              <label htmlFor="email">Your Email</label>
              <input id="email" name="email" type="text" />
            </div>
            <div className="mt-8 flex flex-1 flex-row items-center">
              <button
                className="mr-4 w-fit rounded-sm bg-slate-500 px-8 text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
        <div>{actionData?.error ? actionData?.error?.message : null}</div>
      </main>
    </div>
  )
}
