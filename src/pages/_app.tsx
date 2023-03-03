import {
  createBrowserSupabaseClient,
  type Session,
} from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { type Database } from 'types/supabase.types'
import '@/styles/main.css'
import { trpc } from '@/utils/trpc'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as Fathom from 'fathom-client'
import { Router } from 'next/router'

// Record a pageview when route changes
Router.events.on('routeChangeComplete', (as, routeProps) => {
  if (!routeProps.shallow) {
    Fathom.trackPageview()
  }
})

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  )

  useEffect(() => {
    Fathom.load('NFLJAEWU', {
      url: 'https://twentyone-iggy-pop.mailwind.app/script.js',
      includedDomains: ['mailwind.app', 'mailwind.org'],
    })
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
