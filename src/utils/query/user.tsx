import { useUser } from '@supabase/auth-helpers-react'
import { trpc } from '../trpc'

export const useAuthUser = () => {
  const user = useUser()

  const { isLoading, isError, isSuccess, data, error } =
    trpc.user.byId.useQuery({
      where: {
        id: user?.id,
      },
    })

  return {
    isLoading,
    isError,
    isSuccess,
    data: user
      ? {
          email: user?.email,
          ...data,
        }
      : undefined,
    error,
  }
}
