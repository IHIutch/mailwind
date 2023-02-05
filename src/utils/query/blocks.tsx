import { trpc } from '../trpc'

export const useGetBlocksByTemplateId = (templateId: number) => {
  const { isLoading, isError, isSuccess, data, error } =
    trpc.block.byTemplateId.useQuery({
      where: { templateId },
    })
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
    trpc.block.byId.useQuery({
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

export const useCreateBlock = (templateId: number) => {
  const { block: blockUtils } = trpc.useContext()
  const { mutateAsync, isLoading, isError, isSuccess, data, error } =
    trpc.block.create.useMutation({
      // When mutate is called:
      onMutate: async ({ payload }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await blockUtils.byTemplateId.cancel({
          where: { templateId },
        })
        const previous = blockUtils.byTemplateId.getData({
          where: { templateId },
        })
        blockUtils.byTemplateId.setData(
          {
            where: { templateId },
          },
          (old: any) => {
            return [...old, payload]
          }
        )
        return { previous, updated: payload }
      },
      // If the mutation fails, use the context we returned above
      onError: (err, updated, context) => {
        blockUtils.byTemplateId.setData(
          { where: { templateId } },
          context?.previous
        )
      },
      // Always refetch after error or success:
      onSettled: () => {
        blockUtils.byTemplateId.invalidate({
          where: { templateId },
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

export const useUpdateBlock = (templateId: number) => {
  const { block: blockUtils } = trpc.useContext()
  const { mutateAsync, isLoading, isError, isSuccess, data, error } =
    trpc.block.update.useMutation({
      // When mutate is called:
      onMutate: async ({ where: { id }, payload }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await blockUtils.byTemplateId.cancel({
          where: { templateId },
        })
        const previous = blockUtils.byTemplateId.getData({
          where: { templateId },
        })
        blockUtils.byTemplateId.setData(
          {
            where: { templateId },
          },
          (old) => {
            return old?.map((o) => {
              if (o.id === id) {
                return {
                  ...o,
                  ...payload,
                }
              }
              return o
            })
          }
        )
        return { previous, updated: payload }
      },
      // If the mutation fails, use the context we returned above
      onError: (err, updated, context) => {
        blockUtils.byTemplateId.setData(
          {
            where: { templateId },
          },
          context?.previous
        )
      },
      // Always refetch after error or success:
      // onSettled: () => {
      //   blockUtils.byTemplateId.invalidate({
      //     where: { templateId },
      //   })
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

export const useDeleteBlock = (templateId: number) => {
  const { block: blockUtils } = trpc.useContext()
  const { mutateAsync, isLoading, isError, isSuccess, data, error } =
    trpc.block.delete.useMutation({
      // When mutate is called:
      onMutate: async ({ where: { id } }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await blockUtils.byTemplateId.cancel({
          where: { templateId },
        })
        const previous = blockUtils.byTemplateId.getData({
          where: { templateId },
        })
        blockUtils.byTemplateId.setData(
          {
            where: { templateId },
          },
          (old) => {
            return old?.filter((o) => o.id !== id)
          }
        )
        return { previous, updated: id }
      },
      // If the mutation fails, use the context we returned above
      onError: (err, updated, context) => {
        blockUtils.byTemplateId.setData(
          {
            where: { templateId },
          },
          context?.previous
        )
      },
      // Always refetch after error or success:
      // onSettled: () => {
      //   blockUtils.byTemplateId.invalidate({
      //     where: { templateId },
      //   })
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
