import { z } from 'zod'

import {
  prismaCreateUser,
  prismaDeleteUser,
  prismaFindUniqueUser,
  prismaUpdateUser,
} from '@/utils/prisma/users'
import {
  UserCreateSchema,
  UserUpdateSchema,
  UserWhereSchema,
} from '@/utils/zod/schemas'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'

export const userRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        where: UserWhereSchema.pick({ id: true }),
      })
    )
    .query(async ({ input }) => {
      const { where } = input
      const data = await prismaFindUniqueUser({
        where,
      })
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user found '${where.id}'`,
        })
      }
      return data
    }),
  create: publicProcedure
    .input(
      z.object({
        payload: UserCreateSchema,
      })
    )
    .mutation(async ({ input }) => {
      const { payload } = input
      const data = await prismaCreateUser({
        data: payload,
      })
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Unable to create user`,
        })
      }
      return data
    }),
  update: publicProcedure
    .input(
      z.object({
        where: UserWhereSchema.pick({ id: true }).required(),
        payload: UserUpdateSchema.omit({ id: true }),
      })
    )
    .mutation(async ({ input }) => {
      const { where, payload } = input
      const data = await prismaUpdateUser({
        where,
        data: payload,
      })
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user found '${where.id}'`,
        })
      }
      return data
    }),
  delete: publicProcedure
    .input(
      z.object({
        where: UserWhereSchema.pick({ id: true }).required(),
      })
    )
    .mutation(async ({ input }) => {
      const { where } = input
      const data = await prismaDeleteUser({
        where,
      })
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user found '${where.id}'`,
        })
      }
      return data
    }),
})
