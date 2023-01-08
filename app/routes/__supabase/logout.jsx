import { useOutletContext } from '@remix-run/react'
import { useCallback, useEffect } from 'react'

export default function Logout() {
  const { supabase } = useOutletContext()

  const handleLogout = useCallback(async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log(error)
    }
  }, [supabase.auth])

  useEffect(() => {
    handleLogout()
  }, [handleLogout, supabase])

  return <div>Logging out...</div>
}
