import { useRouter } from 'next/router'
import {
  createBrowserSupabaseClient,
  Session,
} from '@supabase/auth-helpers-nextjs'
import {
  SessionContextProvider,
  useSessionContext,
  useUser,
} from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Database } from '@/types/supabase.types'
import '@/styles/main.css'

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
    </SessionContextProvider>
  )
}

export default MyApp
