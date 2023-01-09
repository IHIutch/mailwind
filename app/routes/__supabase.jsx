import { json } from '@remix-run/node'
import { Outlet, useFetcher, useLoaderData } from '@remix-run/react'
import { createBrowserClient } from '@supabase/auth-helpers-remix'
import { useEffect, useState } from 'react'
import { prismaGetUser, prismaPostUser } from '~/utils/prisma/users.server'
import { createStripeCustomer } from '~/utils/stripe/index.server'
import { createServerClient } from '~/utils/supabase.server'

export const loader = async ({ request }) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  }

  // We can retrieve the session on the server and hand it to the client.
  // This is used to make sure the session is available immediately upon rendering
  const response = new Response()
  const supabase = createServerClient({ request, response })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    // If session exists, but public.user doesn't, this is probably a new user
    // In that case, we need to add them to stripe and add them to the public.user table
    const authUser = await prismaGetUser({ id: session.user.id })

    if (!authUser) {
      const stripeCustomer = await createStripeCustomer({
        email: session.user.email,
      })

      await prismaPostUser({
        id: session.user.id,
        stripeCustomerId: stripeCustomer.id,
        role: 'CUSTOMER',
      })
    }
  }

  // in order for the set-cookie header to be set,
  // headers must be returned as part of the loader response
  return json(
    {
      env,
      session,
    },
    {
      headers: response.headers,
    }
  )
}

export default function Supabase() {
  const { env, session } = useLoaderData()
  const fetcher = useFetcher()

  // it is important to create a single instance of Supabase
  // to use across client components - outlet context 👇
  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_KEY)
  )

  const serverAccessToken = session?.access_token

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        // server and client are out of sync.
        // Remix recalls active loaders after actions complete
        fetcher.submit(
          { event },
          {
            method: 'post',
            action: '/api/handle-supabase-auth',
          }
        )
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [serverAccessToken, supabase, fetcher])

  return <Outlet context={{ supabase }} />
}
