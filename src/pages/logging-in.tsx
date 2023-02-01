import { prismaPostMembership } from '@/utils/prisma/memberships'
import { prismaPostOrganization } from '@/utils/prisma/organizations'
import { prismaGetUser, prismaPostUser } from '@/utils/prisma/users'
import { createStripeCustomer } from '@/utils/stripe'
import { GlobalRole, MembershipRole } from '@prisma/client'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Loader2 } from 'lucide-react'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

export default function LoggingIn() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex items-center">
        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
        <p className="font-semibold">Logging in...</p>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If session exists, but public.user doesn't, this is probably a new user
  // In that case, we need to add them to stripe and add them to the public.user table
  const authUser = await prismaGetUser({ id: session?.user.id })

  if (!authUser) {
    const stripeCustomer = await createStripeCustomer({
      email: session?.user.email || '',
    })

    const [userData, orgData] = await Promise.all([
      await prismaPostUser({
        id: session?.user.id,
        stripeCustomerId: stripeCustomer.id,
        role: GlobalRole.CUSTOMER,
      }),
      await prismaPostOrganization({
        name: session?.user.email,
      }),
    ])

    await prismaPostMembership({
      role: MembershipRole.OWNER,
      userId: session?.user.id,
      organizationId: orgData.id,
    })

    // TODO: Maybe even create a default template
  }

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    }
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
}
