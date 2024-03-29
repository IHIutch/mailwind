import { Loader2 } from 'lucide-react'
import { type GetServerSidePropsContext } from 'next'

import { appRouter } from '@/server/routers/_app'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

export default function NewTemplate() {
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
  const supabase = createPagesServerClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const caller = appRouter.createCaller({})
  const user = await caller.user.byId({
    where: {
      id: session?.user.id || '',
    },
  })

  const template = await caller.template.create({
    payload: {
      membershipId: Number(user.memberships[0]?.id),
      title: '',
    },
  })

  // TODO: Create a bunch of default blocks as well. This should probably wrapped in a single Prisma transaction

  if (session) {
    return {
      redirect: {
        destination: `/templates/${template.id}`,
        permanent: false,
      },
    }
  }

  return { props: {} }
}
