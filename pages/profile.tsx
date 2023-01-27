import {
  createServerSupabaseClient,
  Session,
  User,
} from '@supabase/auth-helpers-nextjs'
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import { GetServerSidePropsContext } from 'next'

export default function Profile() {
  const { isLoading, session, error } = useSessionContext()
  const user = useUser()

  return (
    <div>{JSON.stringify({ isLoading, session, error, user }, null, 2)}</div>
  )
}

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   // Create authenticated Supabase Client
//   const supabase = createServerSupabaseClient(ctx)
//   // Check if we have a session
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   console.log('profile', { session })

//   // if (!session)
//   //   return {
//   //     redirect: {
//   //       destination: '/',
//   //       permanent: false,
//   //     },
//   //   }

//   return {
//     props: {
//       initialSession: session,
//       user: session?.user || null,
//     },
//   }
// }
