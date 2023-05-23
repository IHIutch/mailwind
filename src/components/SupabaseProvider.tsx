'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Database } from 'types/supabase.types'

import { createServerClient } from '@/utils/supabase/supabase-browser'
import type { Session, SupabaseClient } from '@supabase/auth-helpers-nextjs'

type MaybeSession = Session | null
type SupabaseContext = {
  supabase: SupabaseClient<Database>
  session: MaybeSession
}

// @ts-ignore
const Context = createContext<SupabaseContext>()

export default function SupabaseProvider({
  children,
  session,
}: {
  children: ReactNode
  session: MaybeSession
}) {
  const [supabase] = useState(() => createServerClient())

  return (
    <Context.Provider value={{ supabase, session }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => useContext(Context)
