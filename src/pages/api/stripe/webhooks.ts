import { buffer } from 'micro'
import { type NextApiRequest, type NextApiResponse } from 'next'
import type Stripe from 'stripe'

import { env } from '@/server/env'
import { resStatusType } from '@/utils/apiResponseTypes'
import { getErrorMessage } from '@/utils/functions'
import { prismaUpdateOrganization } from '@/utils/prisma/organizations'
import { stripe } from '@/utils/stripe'

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const signature = req.headers['stripe-signature'] as string
    const reqBuffer = await buffer(req)

    const event: Stripe.Event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      env.STRIPE_SIGNING_SECRET
    )

    const subscription = event.data.object as Stripe.Subscription

    switch (event.type) {
      //   case 'checkout.session.completed':
      //     console.log('checkout completed')
      //     break
      case 'customer.subscription.updated':
        await prismaUpdateOrganization({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          data: {
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
          },
        })
        console.log('subscription updated')
        res.status(resStatusType.SUCCESS)
        break
      case 'customer.subscription.deleted':
        await prismaUpdateOrganization({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          data: {
            stripeSubscriptionId: null,
          },
        })
        console.log('subscription deleted')
        res.status(resStatusType.SUCCESS)
        break
      default:
        res.setHeader('Allow', ['POST'])
        res.status(resStatusType.NOT_ALLOWED).end(`Webhook  Not Supported`)
    }
  } catch (error) {
    return res
      .status(resStatusType.BAD_REQUEST)
      .send(`Stripe webhook error: ${getErrorMessage(error)}`)
  }
}

export default handler
