import * as React from 'react'
import { useRouter } from 'next/router'
import { type SubmitHandler, useForm } from 'react-hook-form'
import axios from 'redaxios'
import { type Database } from 'types/supabase.types'

import GlobalNavbar from '@/components/GlobalNavbar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { getErrorMessage } from '@/utils/functions'
import { useAuthUser } from '@/utils/query/user'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

type AccountFormValues = {
  email: string
}

export default function Account() {
  return (
    <div className="h-full bg-neutral-50">
      <GlobalNavbar className="shadow-sm" />
      <div className="pt-16">
        <div className="container-md mx-auto px-4 py-12">
          <h1 className="mb-8 text-3xl font-bold">Account</h1>
          <div className="space-y-12">
            <div className="rounded-lg border bg-white p-8 shadow">
              <AccountDetailsBlock />
            </div>
            <div className="rounded-lg border bg-white p-8 shadow">
              <SubscriptionDetailsBlock />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AccountDetailsBlock = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitSuccess, setIsSubmitSuccess] = React.useState(false)

  const { data: user } = useAuthUser()
  const supabaseClient = useSupabaseClient<Database>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountFormValues>({
    defaultValues: {
      email: '',
    },
  })

  React.useEffect(() => {
    reset({ email: user?.email })
  }, [reset, user?.email])

  const onSubmit: SubmitHandler<AccountFormValues> = async (form) => {
    try {
      setIsSubmitting(true)
      supabaseClient.auth.updateUser({
        email: form.email,
      })
      setIsSubmitSuccess(true)
      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
      alert(getErrorMessage(error))
    }
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Account Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <p id="email-error-message" className="mt-1 text-xs text-red-500">
              {errors.email?.message?.toString()}
            </p>
          ) : null}
        </div>
        <div className="flex ">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </div>
  )
}

const SubscriptionDetailsBlock = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const router = useRouter()
  const { data: user } = useAuthUser()

  const stripeSubscriptionId =
    user?.memberships[0]?.Organization.stripeSubscriptionId

  async function onSubmit(event: React.FormEvent) {
    try {
      event.preventDefault()
      setIsSubmitting(!isSubmitting)

      // Get a Stripe session URL
      const { data } = await axios.get(`/api/stripe/create-portal`)
      router.push(data.url)
    } catch (error) {
      setIsSubmitting(false)
      alert(getErrorMessage(error))
    }
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="mb-1 text-xl font-semibold">Subscription Details</h2>
        {stripeSubscriptionId ? (
          <p>You have an active subscription</p>
        ) : (
          <p className="text-neutral-500">You are currently unsubscribed</p>
        )}
      </div>

      {stripeSubscriptionId ? null : (
        <p className="mb-4">
          Without a subscription, you are limited to 2 templates. If you already
          have 2 or more templates, you won&apos;t be able to create new
          templates.
        </p>
      )}
      <form onSubmit={onSubmit}>
        <Button disabled={isSubmitting}>
          {stripeSubscriptionId ? 'Manage Subscription' : 'Subscribe'}
        </Button>
      </form>
    </div>
  )
}
