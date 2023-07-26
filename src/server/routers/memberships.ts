import { z } from 'zod'

import {
  prismaCreateMembership,
  prismaDeleteMembership,
  prismaFindUniqueMembership,
  prismaUpdateMembership,
} from '@/utils/prisma/memberships'
import {
  MembershipCreateSchema,
  MembershipUpdateSchema,
  MembershipWhereSchema,
} from '@/utils/zod/schemas'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'

export const membershipRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        where: MembershipWhereSchema.pick({ id: true }),
      })
    )
    .query(async ({ input }) => {
      const { where } = input
      const data = await prismaFindUniqueMembership({
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
        payload: MembershipCreateSchema,
      })
    )
    .mutation(async ({ input }) => {
      const { payload } = input
      const data = await prismaCreateMembership({
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
        where: MembershipWhereSchema.pick({ id: true }).required(),
        payload: MembershipUpdateSchema.omit({ id: true }),
      })
    )
    .mutation(async ({ input }) => {
      const { where, payload } = input
      const data = await prismaUpdateMembership({
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
        where: MembershipWhereSchema.pick({ id: true }).required(),
      })
    )
    .mutation(async ({ input }) => {
      const { where } = input
      const data = await prismaDeleteMembership({
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
