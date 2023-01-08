import { useOutletContext } from '@remix-run/react'
import { Loader2 } from 'lucide-react'
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

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex items-center">
        <Loader2 className="h-5 w-5 animate-spin mr-3" />
        <p className="font-semibold">Logging out...</p>
      </div>
    </div>
  )
}
