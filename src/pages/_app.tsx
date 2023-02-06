import {
  createBrowserSupabaseClient,
  Session,
} from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Database } from 'types/supabase.types'
import '@/styles/main.css'
import { trpc } from '@/utils/trpc'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const router = useRouter()
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  )

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load('NFLJAEWU', {
      includedDomains: ['mailwind.app', 'mailwind.org'],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </SessionContextProvider>
  )
}

export default trpc.withTRPC(MyApp)
