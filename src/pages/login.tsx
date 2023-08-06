import { useState } from 'react'
import { type GetServerSidePropsContext } from 'next'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type Database } from 'types/supabase.types'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { getAbsoluteUrl, getErrorMessage } from '@/utils/functions'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

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

  const onSubmit: SubmitHandler<FormValues> = async (form) => {
    try {
      setIsSubmitting(true)
      const { error } = await supabaseClient.auth.signInWithOtp({
        email: form.email,
        options: {
          emailRedirectTo: getAbsoluteUrl('/api/auth/callback'),
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
    <main className="h-full bg-neutral-50 pt-20">
      <div className="mx-auto w-96 rounded-lg border bg-white p-8 shadow">
        {isSubmitSuccess ? (
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold">Email Sent</h1>
            <div className="mb-8 flex flex-col gap-4 text-sm text-gray-600">
              <p>
                A link to log in has been sent to{' '}
                <span className="font-semibold">{getValues('email')}</span>.
              </p>
              <p>It can only be used once and expires in 24 hours.</p>
            </div>
            <p>
              {/* This forces a page refresh, resetting the form */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a className="font-medium underline" href="/login">
                Didn&apos;t get the link? Try Again
              </a>
              .
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
                  <Label htmlFor="email">Your Email</Label>
                  <Input
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
                  <Button
                    className="w-full"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Login Link'}
                  </Button>
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
  const supabase = createPagesServerClient(ctx)
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
