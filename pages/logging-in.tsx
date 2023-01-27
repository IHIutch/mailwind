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

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    }
  }

  return { props: {} }
}
