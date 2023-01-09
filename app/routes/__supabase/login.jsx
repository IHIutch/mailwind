import * as Label from '@radix-ui/react-label'
import { redirect, json } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import clsx from 'clsx'
import { createServerClient } from '~/utils/supabase.server'

// https://remix.run/api/conventions#meta
export const meta = () => {
  return {
    title: 'Mailwind',
    description: 'Welcome to Mailwind!',
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
        emailRedirectTo:
          (process.env.NODE_ENV === 'production'
            ? 'https://mailwind.app'
            : 'http://localhost:3000') + '/handle-login',
      },
    })

    console.log({ data })

    if (error) throw Error(error.message)
    return json({
      email,
    })
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
  const fetcher = useFetcher()

  return (
    <main>
      <div className="mx-auto w-96 border rounded-lg mt-20 p-8 shadow">
        {fetcher.data?.email ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Email Sent</h1>
            <p className="text-gray-600 text-sm mb-8">
              A link has been sent to{' '}
              <span className="font-semibold">{fetcher.data?.email}</span>.
              <br />
              It expires in 24 hours and can only be used once.
            </p>
            <p>
              Didn't get the link? <a href="/login">Try Again</a>.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-center">Login</h1>
            </div>
            <fetcher.Form method="post">
              <div>
                <div className="mb-4">
                  <Label.Root
                    htmlFor="email"
                    className="mb-1 block text-sm font-semibold text-gray-700"
                  >
                    Your Email
                  </Label.Root>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    aria-describedby={
                      fetcher.data?.error || `email-error-message`
                    }
                    aria-invalid={fetcher.data?.error ? 'true' : 'false'}
                  />
                  {fetcher.data?.error ? (
                    <p
                      id="email-error-message"
                      className="mt-1 text-xs text-red-500"
                    >
                      {fetcher.data?.error?.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <button
                    className={clsx(
                      'w-full cursor-pointer rounded-md bg-indigo-500 py-2 px-4 font-semibold text-white hover:bg-indigo-600',
                      'disabled:opacity-60 disabled:cursor-not-allowed'
                    )}
                    disabled={fetcher.state !== 'idle'}
                    type="submit"
                  >
                    {fetcher.state !== 'idle'
                      ? 'Sending...'
                      : 'Send Login Link'}
                  </button>
                </div>
              </div>
            </fetcher.Form>
          </div>
        )}
      </div>
    </main>
  )
}
