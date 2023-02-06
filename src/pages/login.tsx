import { getBaseUrl, getErrorMessage } from '@/utils/functions'
import * as Label from '@radix-ui/react-label'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import clsx from 'clsx'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Database } from 'types/supabase.types'

type FormValues = {
  email: string
}

export default function Login() {
  const supabaseClient = useSupabaseClient<Database>()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>()
  console.log(`${getBaseUrl()}/logging-in`)

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    try {
      setIsSubmitting(true)
      const { error } = await supabaseClient.auth.signInWithOtp({
        email: form.email,
        options: {
          emailRedirectTo: `${getBaseUrl()}/logging-in`,
        },
      })

      if (error) throw new Error(error.message)
      setIsSubmitSuccess(true)
    } catch (error) {
      setIsSubmitting(false)
      alert(getErrorMessage(error))
    }
  }

  return (
    <main>
      <div className="mx-auto mt-20 w-96 rounded-lg border p-8 shadow">
        {isSubmitSuccess ? (
          <div className="text-center">
            <h1 className="mb-2 text-3xl font-bold">Email Sent</h1>
            <p className="mb-8 text-sm text-gray-600">
              A link has been sent to{' '}
              <span className="font-semibold">{getValues('email')}</span>.
              <br />
              It expires in 24 hours and can only be used once.
            </p>
            <p>
              Didn&apos;t get the link? <Link href="/login">Try Again</Link>.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="text-center text-3xl font-bold">Login</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    type="email"
                    {...register('email', {
                      required: 'This field is required',
                    })}
                    autoComplete="email"
                    required
                    aria-describedby={errors.email ? 'email-error-message' : ''}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email ? (
                    <p
                      id="email-error-message"
                      className="mt-1 text-xs text-red-500"
                    >
                      {errors.email?.message?.toString()}
                    </p>
                  ) : null}
                </div>
                <div>
                  <button
                    className={clsx(
                      'w-full cursor-pointer rounded-md bg-indigo-500 py-2 px-4 font-semibold text-white hover:bg-indigo-600',
                      'disabled:cursor-not-allowed disabled:opacity-60'
                    )}
                    // className="w-full cursor-pointer rounded-md bg-indigo-500 py-2 px-4 font-semibold text-white hover:bg-indigo-600"
                    disabled={isSubmitting}
                    // type="submit"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Login Link'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    }
  }

  return { props: {} }
}
