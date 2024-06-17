import { trpc } from '../trpc'

export const useGetTemplatesByMembershipId = (
  membershipId: number | undefined
) => {
  const { isLoading, isError, isSuccess, data, error } =
    trpc.template.byMembershipId.useQuery(
      {
        where: { membershipId },
      },
      {
        enabled: !!membershipId,
      }
    )
  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}

export const useGetTemplateById = (id: number) => {
  const { isLoading, isError, isSuccess, data, error } =
    trpc.template.byId.useQuery({
      where: { id },
    })
  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}

export const useCreateTemplate = (membershipId: number) => {
  const { template: templateUtils } = trpc.useContext()
  const { mutateAsync, isLoading, isError, isSuccess, data, error } =
    trpc.template.create.useMutation({
      // When mutate is called:
      onMutate: async ({ payload }: { payload: any }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await templateUtils.byMembershipId.cancel({
          where: { membershipId },
        })
        const previous = templateUtils.byMembershipId.getData({
          where: { membershipId },
        })
        templateUtils.byMembershipId.setData(
          {
            where: { membershipId },
          },
          (old: any) => {
            return [...old, payload]
          }
        )
        return { previous, updated: payload }
      },
      // If the mutation fails, use the context we returned above
      onError: (err, updated, context) => {
        templateUtils.byMembershipId.setData(
          {
            where: { membershipId },
          },
          context?.previous
        )
      },
      // Always refetch after error or success:
      onSettled: () => {
        templateUtils.byMembershipId.invalidate({
          where: { membershipId },
        })
      },
    })
  return {
    mutateAsync,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}

export const useUpdateTemplate = (id: number) => {
  const { template: templateUtils } = trpc.useContext()
  const { mutateAsync, isLoading, isError, isSuccess, data, error } =
    trpc.template.update.useMutation({
      // When mutate is called:
      onMutate: async ({ payload }: { payload: any }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await templateUtils.byId.cancel({
          where: { id },
        })
        const previous = templateUtils.byId.getData({
          where: { id },
        })
        templateUtils.byId.setData(
          {
            where: { id },
          },
          (old: any) => ({
            ...old,
            ...payload,
          })
        )
        return { previous, updated: payload }
      },
      // If the mutation fails, use the context we returned above
      onError: (err, updated, context) => {
        templateUtils.byId.setData(
          {
            where: { id },
          },
          context?.previous
        )
      },
      // Always refetch after error or success:
      onSettled: () => {
        templateUtils.byId.invalidate({
          where: { id },
        })
      },
    })
  return {
    mutateAsync,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}
