import {
  useSession,
  useSessionContext,
  useUser,
} from '@supabase/auth-helpers-react'
import { trpc } from '../trpc'

export const useAuthUser = () => {
  const { isLoading: isSessionLoading } = useSessionContext()
  const user = useUser()

  if (!isSessionLoading || !user) {
    return {
      data: null,
    }
  }

  const { isLoading, isError, isSuccess, data, error } =
    trpc.user.byId.useQuery({
      where: {
        id: user?.id || '',
      },
    })

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
