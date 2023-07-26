import { z } from 'zod'

import {
  prismaCreateOrganization,
  prismaDeleteOrganization,
  prismaFindUniqueOrganization,
  prismaUpdateOrganization,
} from '@/utils/prisma/organizations'
import {
  OrganizationCreateSchema,
  OrganizationUpdateSchema,
  OrganizationWhereSchema,
} from '@/utils/zod/schemas'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'

export const organizationRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        where: OrganizationWhereSchema.pick({ id: true }),
      })
    )
    .query(async ({ input }) => {
      const { where } = input
      const data = await prismaFindUniqueOrganization({
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
        payload: OrganizationCreateSchema,
      })
    )
    .mutation(async ({ input }) => {
      const { payload } = input
      const data = await prismaCreateOrganization({
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
        where: OrganizationWhereSchema.pick({ id: true }).required(),
        payload: OrganizationUpdateSchema.omit({ id: true }),
      })
    )
    .mutation(async ({ input }) => {
      const { where, payload } = input
      const data = await prismaUpdateOrganization({
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
        where: OrganizationWhereSchema.pick({ id: true }).required(),
      })
    )
    .mutation(async ({ input }) => {
      const { where } = input
      const data = await prismaDeleteOrganization({
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
