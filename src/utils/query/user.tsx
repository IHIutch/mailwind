import { useUser } from '@supabase/auth-helpers-react'
import { trpc } from '../trpc'

export const useAuthUser = () => {
  const user = useUser()
  const { isLoading, isError, isSuccess, data, error } =
    trpc.user.byId.useQuery({ id: user?.id || '' })
  return {
    isLoading,
    isError,
    isSuccess,
    data: {
      email: user?.email,
      ...data,
    },
    error,
  }
}
