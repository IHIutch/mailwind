import { appRouter } from '@/server/routers/_app'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Loader2 } from 'lucide-react'
import { GetServerSidePropsContext } from 'next'

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
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const caller = appRouter.createCaller({})
  const user = await caller.user.byId({ id: session?.user.id ?? '' })

  if (!user.memberships) {
    return {
      redirect: {
        destination: `/logout`,
        permanent: false,
      },
    }
  }

  const template = await caller.template.create({
    payload: {
      membershipId: user.memberships[0]?.id ?? -1,
      title: null,
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
