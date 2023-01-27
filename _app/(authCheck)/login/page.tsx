'use client'

import { useState } from 'react'
import * as Label from '@radix-ui/react-label'
import { useSupabase } from '@/components/SupabaseProvider'
import { SubmitHandler, useForm } from 'react-hook-form'
import clsx from 'clsx'
import { getErrorMessage } from '@/utils/functions'

type FormValues = {
  email: string
}

export default function Login() {
  const { supabase } = useSupabase()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

  const appUrl =
    process?.env?.SITE_URL ??
    process?.env?.VERCEL_URL ??
    'http://localhost:3000'

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>()
  // const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    try {
      setIsSubmitting(true)
      const { error } = await supabase.auth.signInWithOtp({
        email: form.email,
        options: {
          emailRedirectTo: appUrl + '/profile',
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
              Didn't get the link? <a href="/login">Try Again</a>.
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
