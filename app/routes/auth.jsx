import { useFetcher } from '@remix-run/react'
import { useEffect } from 'react'
import { supabase } from '~/utils/supabase'

export default function Auth() {
  const authFetcher = useFetcher()

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          authFetcher.submit(
            {
              accessToken: session.access_token,
            },
            {
              method: 'post',
              action: 'api/auth/login',
            }
          )
        }
      }
    )
    return () => {
      listener?.unsubscribe()
    }
  }, [])
}
