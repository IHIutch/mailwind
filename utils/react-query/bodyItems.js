import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { db } from '~/models/db'
// import {
//   deleteBodyItem,
//   getBodyItem,
//   getBodyItems,
//   postBodyItem,
//   putBodyItem,
//   putBulkBodyItems,
// } from '../axios/bodyItems'

export const useGetBodyItems = (params) => {
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    ['bodyItems', params],
    async () => await db.body.orderBy('position').toArray()
  )
  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}

export const useGetBodyItem = (id) => {
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    ['bodyItems', id],
    async () => await db.body.where({ id }).first(),
    {
      enabled: !!id,
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

export const useCreateBodyItem = (params) => {
  const queryClient = useQueryClient()
  const {
    mutateAsync: mutate,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation(
    async (payload) => {
      await db.body.add(payload)
    },
    {
      // When mutate is called:
      onMutate: async (updated) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['bodyItems', params])
        const previous = queryClient.getQueryData(['bodyItems', params])
        queryClient.setQueryData(['bodyItems', params], (old) => {
          return [...old, updated]
        })
        return { previous, updated }
      },
      // If the mutation fails, use the context we returned above
      onError: (err, updated, context) => {
        queryClient.setQueryData(['bodyItems', params], context.previous)
      },
      // Always refetch after error or success:
      onSettled: (updated) => {
        queryClient.invalidateQueries(['bodyItems', params])
      },
    }
  )
  return {
    mutate,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}

export const useUpdateBodyItem = (params) => {
  const queryClient = useQueryClient()
  const {
    mutateAsync: mutate,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation(
    async ({ id, payload }) => {
      await db.body.update(id, payload)
    },
    {
      // When mutate is called:
      onMutate: async ({ payload }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['bodyItems', params])
        const previous = queryClient.getQueryData(['bodyItems', params])

        queryClient.setQueryData(['bodyItems', params], (old) => {
          return old.map((o) => {
            if (o.id === payload.id) {
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
        queryClient.setQueryData(['bodyItems', params], context.previous)
      },
      // Always refetch after error or success:
      onSettled: (updated) => {
        queryClient.invalidateQueries(['bodyItems', params])
      },
    }
  )
  return {
    mutate,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}

export const useBulkUpdateBodyItems = (params) => {
  const queryClient = useQueryClient()
  const {
    mutateAsync: mutate,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation(
    async (payload) => {
      await db.body.bulkPut(payload)
    },
    {
      // When mutate is called:
      onMutate: async (payload) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['bodyItems', params])
        const previous = queryClient.getQueryData(['bodyItems', params])
        queryClient.setQueryData(['bodyItems', params], (old) => {
          return old.map((o) => {
            return {
              ...o,
              ...(payload.find((p) => p.id === o.id) || {}),
            }
          })
        })
        return { previous, updated: payload }
      },
      // If the mutation fails, use the context we returned above
      onError: (err, updated, context) => {
        queryClient.setQueryData(['bodyItems', params], context.previous)
      },
      // Always refetch after error or success:
      onSettled: (updated) => {
        queryClient.invalidateQueries(['bodyItems', params])
      },
    }
  )
  return {
    mutate,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}

export const useDeleteBodyItem = (params) => {
  const queryClient = useQueryClient()
  const {
    mutateAsync: mutate,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation(
    async (id) => {
      // await deleteBodyItem(id)
    },
    {
      // When mutate is called:
      onMutate: async (id) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['bodyItems', params])
        const previous = queryClient.getQueryData(['bodyItems', params])
        queryClient.setQueryData(['bodyItems', params], (old) => {
          return old.filter((o) => o.id !== id)
        })
        return { previous, updated: id }
      },
      // If the mutation fails, use the context we returned above
      onError: (err, updated, context) => {
        queryClient.setQueryData(['bodyItems', params], context.previous)
      },
      // Always refetch after error or success:
      onSettled: (updated) => {
        queryClient.invalidateQueries(['bodyItems', params])
      },
    }
  )
  return {
    mutate,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  }
}
