import React, { useCallback, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/router'
import { type Database } from 'types/supabase.types'

import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Logout() {
  const router = useRouter()
  const supabaseClient = useSupabaseClient<Database>()

  const handleLogout = useCallback(async () => {
    const { error } = await supabaseClient.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }

    router.replace('/login')
  }, [supabaseClient.auth, router])

  useEffect(() => {
    handleLogout()
  }, [handleLogout, supabaseClient])

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex items-center">
        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
        <p className="font-semibold">Logging out...</p>
      </div>
    </div>
  )
}
