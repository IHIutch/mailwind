import { trpc } from '../trpc'

export const useGetBlocksByTemplateId = (templateId: number) => {
  const { isLoading, isError, isSuccess, data, error } =
    trpc.block.byTemplateId.useQuery({ templateId })
  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}

export const useGetBlockById = (id: number) => {
  const { isLoading, isError, isSuccess, data, error } =
    trpc.block.byId.useQuery({ id })
  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}

export const useCreateBlock = (templateId: number) => {
  const { block: blockUtils } = trpc.useContext()
  const { mutateAsync, isLoading, isError, isSuccess, data, error } =
    trpc.block.create.useMutation({
      // When mutate is called:
      onMutate: async ({ payload }: { payload: any }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await blockUtils.byTemplateId.cancel({ templateId })
        const previous = blockUtils.byTemplateId.getData({ templateId })
        blockUtils.byTemplateId.setData({ templateId }, (old: any) => {
          return [...old, payload]
        })
        return { previous, updated: payload }
      },
      // If the mutation fails, use the context we returned above
      onError: (err, updated, context) => {
        blockUtils.byTemplateId.setData({ templateId }, context?.previous)
      },
      // Always refetch after error or success:
      onSettled: (updated) => {
        blockUtils.byTemplateId.invalidate({ templateId })
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

export const useUpdateBlock = (templateId: number) => {
  const { block: blockUtils } = trpc.useContext()
  const { mutateAsync, isLoading, isError, isSuccess, data, error } =
    trpc.block.update.useMutation({
      // When mutate is called:
      onMutate: async ({ id, payload }: { id?: number; payload: any }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await blockUtils.byTemplateId.cancel({ templateId })
        const previous = blockUtils.byTemplateId.getData({ templateId })
        blockUtils.byTemplateId.setData({ templateId }, (old: any) => {
          return old.map((o: any) => {
            if (o.id === id) {
              return {
                ...o,
                ...payload,
              }
            }
            return o
          })
        })
        return { previous, updated: payload }
      },
      // If the mutation fails, use the context we returned above
      onError: (err, updated, context) => {
        blockUtils.byTemplateId.setData({ templateId }, context?.previous)
      },
      // Always refetch after error or success:
      // onSettled: (updated) => {
      //   blockUtils.byTemplateId.invalidate({ templateId })
      // },
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
