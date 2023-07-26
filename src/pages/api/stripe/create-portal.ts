import { type NextApiRequest, type NextApiResponse } from 'next'

import { env } from '@/server/env'
import { appRouter } from '@/server/routers/_app'
import { resStatusType } from '@/utils/apiResponseTypes'
import { getErrorMessage } from '@/utils/functions'
import {
  createStripeBillingSession,
  createStripeCheckoutSession,
} from '@/utils/stripe'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const supabase = createPagesServerClient({ req, res })
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return res.status(401).send('Unauthorized')
    }

    const caller = appRouter.createCaller({})
    const user = await caller.user.byId({
      where: {
        id: session?.user.id || '',
      },
    })

    const organization = user.memberships[0]?.Organization

    if (organization?.stripeCustomerId && organization?.stripeSubscriptionId) {
      // Has stripeCustomerId and stripeSubscriptionId
      const stripeSession = await createStripeBillingSession(
        organization.stripeCustomerId
      )

      res.send({
        url: stripeSession.url,
      })
    } else if (
      organization?.stripeCustomerId &&
      !organization?.stripeSubscriptionId
    ) {
      // Has stripeCustomerId but not stripeSubscriptionId
      const stripeSession = await createStripeCheckoutSession(
        organization.stripeCustomerId,
        {
          priceId: env.STRIPE_MONTHLY_PLAN_ID,
        }
      )

      res.send({
        url: stripeSession.url,
      })
    } else {
      // Has neither stripeCustomerId nor stripeSubscriptionId. This should never happen.
      return res
        .status(resStatusType.BAD_REQUEST)
        .send(`Stripe error: No stripeCustomerId associate with organization`)
    }
  } catch (error) {
    return res
      .status(resStatusType.BAD_REQUEST)
      .send(`Stripe webhook error: ${getErrorMessage(error)}`)
  }
}

export default handler
