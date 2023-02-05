import { trpc } from '../trpc'

export const useGetTemplatesByOrganizationId = (organizationId: number) => {
  const { isLoading, isError, isSuccess, data, error } =
    trpc.template.byOrganizationId.useQuery({
      where: { organizationId },
    })
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

export const useCreateTemplate = (organizationId: number) => {
  const { template: templateUtils } = trpc.useContext()
  const { mutateAsync, isLoading, isError, isSuccess, data, error } =
    trpc.template.create.useMutation({
      // When mutate is called:
      onMutate: async ({ payload }: { payload: any }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await templateUtils.byOrganizationId.cancel({
          where: { organizationId },
        })
        const previous = templateUtils.byOrganizationId.getData({
          where: { organizationId },
        })
        templateUtils.byOrganizationId.setData(
          {
            where: { organizationId },
          },
          (old: any) => {
            return [...old, payload]
          }
        )
        return { previous, updated: payload }
      },
      // If the mutation fails, use the context we returned above
      onError: (err, updated, context) => {
        templateUtils.byOrganizationId.setData(
          {
            where: { organizationId },
          },
          context?.previous
        )
      },
      // Always refetch after error or success:
      onSettled: () => {
        templateUtils.byOrganizationId.invalidate({
          where: { organizationId },
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
