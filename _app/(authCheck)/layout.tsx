import 'server-only'

import SupabaseListener from '@/components/SupabaseListener'
import SupabaseProvider from '@/components/SupabaseProvider'
import { createServerClient } from '@/utils/supabase/supabase-server'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase.types'

export type TypedSupabaseClient = SupabaseClient<Database>

// do not cache this layout
export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <SupabaseProvider session={session}>
      <SupabaseListener serverAccessToken={session?.access_token} />
      {children}
    </SupabaseProvider>
  )
}
