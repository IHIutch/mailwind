import { useFetcher } from '@remix-run/react'
import { useEffect } from 'react'
import { supabase } from '~/utils/supabase'

export default function Logout() {
  const authFetcher = useFetcher()

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        authFetcher.submit(null, {
          method: 'post',
          action: '/api/auth/logout',
        })
      }
    })
    return () => {
      listener?.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const logoutUser = async () => {
      await supabase.auth.signOut()
    }

    logoutUser()
  }, [])

  return null
}
