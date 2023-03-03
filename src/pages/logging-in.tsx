import { prisma } from '@/server/prisma'
import { prismaFindUniqueUser } from '@/utils/prisma/users'
import { createStripeCustomer } from '@/utils/stripe'
import { BlockType, GlobalRole, MembershipRole } from '@prisma/client'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@supabase/auth-helpers-react'
import { LexoRank } from 'lexorank'
import { Loader2 } from 'lucide-react'
import { type GetServerSidePropsContext } from 'next'
import React from 'react'
import { type Database } from 'types/supabase.types'

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
  const supabase = createServerSupabaseClient<Database>(ctx)
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
            },
          },
          User: {
            create: {
              stripeCustomerId: stripeCustomer.id,
              id: user.id,
              role: GlobalRole.CUSTOMER,
            },
          },
        },
      })

      await prisma.template.create({
        data: {
          title: 'My First Template',
          organizationId: newUserMembership.organizationId,
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
