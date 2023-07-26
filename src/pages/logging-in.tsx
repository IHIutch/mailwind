import React from 'react'
import { LexoRank } from 'lexorank'
import { Loader2 } from 'lucide-react'
import { type GetServerSidePropsContext } from 'next'
import { type Database } from 'types/supabase.types'

import { prisma } from '@/server/prisma'
import { prismaFindUniqueUser } from '@/utils/prisma/users'
import { createStripeCustomer, updateStripeCustomer } from '@/utils/stripe'
import { BlockType, GlobalRole, MembershipRole } from '@prisma/client'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

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
  const supabase = createPagesServerClient<Database>(ctx)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    // If session exists, but public.user doesn't, this is probably a new user
    // In that case, we need to add them to stripe and add them to the public.user table
    const exisingUser = await prismaFindUniqueUser({
      where: { id: user.id },
    })

    if (!exisingUser) {
      const stripeCustomer = await createStripeCustomer({
        email: user.email || '',
      })

      const newUserMembership = await prisma.membership.create({
        data: {
          role: MembershipRole.OWNER,
          Organization: {
            create: {
              name: user.email || '',
              stripeCustomerId: stripeCustomer.id,
            },
          },
          User: {
            create: {
              id: user.id,
              role: GlobalRole.CUSTOMER,
            },
          },
        },
      })

      await updateStripeCustomer(stripeCustomer.id, {
        metadata: {
          organizationId: newUserMembership.organizationId,
        },
      })

      await prisma.template.create({
        data: {
          title: 'My First Template',
          membershipId: newUserMembership.id,
          blocks: {
            create: {
              type: BlockType.H1,
              value: '<p>Get Started</p>',
              position: LexoRank.middle().toString(),
              attributes: {
                paddingTop: '0',
                paddingRight: '0',
                paddingBottom: '28px',
                paddingLeft: '0',
                fontSize: '36px',
                lineHeight: '40px',
                fontWeight: '800',
                backgroundColor: '#ffffff',
              },
            },
          },
        },
      })
    }

    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
