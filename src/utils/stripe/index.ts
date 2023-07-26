import { Stripe } from 'stripe'

import { env } from '@/server/env'
import { getAbsoluteUrl } from '../functions'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
  typescript: true,
})

export const createStripeCustomer = async (payload: {
  email?: string
  metadata?: Record<string, any>
}) => {
  return await stripe.customers.create(payload)
}

export const updateStripeCustomer = async (
  stripeCustomerId: string,
  payload: {
    email?: string
    metadata?: Record<string, any>
  }
) => {
  return await stripe.customers.update(stripeCustomerId, payload)
}

export const createStripeBillingSession = async (stripeCustomerId: string) => {
  return await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: getAbsoluteUrl('/account'),
  })
}

export const createStripeCheckoutSession = async (
  stripeCustomerId: string,
  payload: {
    priceId: string
  }
) => {
  return await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: payload.priceId,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
        quantity: 1,
      },
    ],
    success_url: getAbsoluteUrl('/account?checkout=success'),
    cancel_url: getAbsoluteUrl('/account?checkout=cancel'),
  })
}
