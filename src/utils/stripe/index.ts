import initStripe from 'stripe'

const stripe = new initStripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
})

export const createStripeCustomer = async ({ email }: { email: string }) => {
  return await stripe.customers.create({
    email,
  })
}

export const createStripeBillingSession = async (stripeCustomerId: string) => {
  return await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.BASE_URL}/account`,
  })
}

export const createStripeCheckoutSession = async (
  stripeCustomerId: string,
  lineItems: [
    {
      price: string
    }
  ]
) => {
  return await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: `${process.env.BASE_URL}/account?checkout=success`,
    cancel_url: `${process.env.BASE_URL}/account?checkout=cancel`,
  })
}
