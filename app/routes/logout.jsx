import { useFetcher } from '@remix-run/react'
import { useEffect } from 'react'
import { supabase } from '~/utils/supabase'

export default function Logout() {
  const authFetcher = useFetcher()
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') {
      authFetcher.submit({ event }, { method: 'post', action: '/auth' })
    }
  })

  useEffect(() => {
    const logoutUser = async () => {
      await supabase.auth.signOut()
    }

    logoutUser()
  }, [])

  return null
}
