import {
  createBrowserSupabaseClient,
  Session,
} from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Database } from 'types/supabase.types'
import '@/styles/main.css'
import { trpc } from '@/utils/trpc'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  )

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
