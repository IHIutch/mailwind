import { z } from 'zod'

import {
  prismaCreateTemplate,
  prismaDeleteTemplate,
  prismaFindTemplates,
  prismaFindUniqueTemplate,
  prismaUpdateTemplate,
} from '@/utils/prisma/templates'
import {
  TemplateCreateSchema,
  TemplateUpdateSchema,
  TemplateWhereSchema,
} from '@/utils/zod/schemas'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'

export const templateRouter = router({
  byMembershipId: publicProcedure
    .input(
      z.object({
        where: TemplateWhereSchema.pick({ membershipId: true }),
      })
    )
    .query(async ({ input }) => {
      const { where } = input
      const data = await prismaFindTemplates({
        where,
      })
      return data
    }),
  byId: publicProcedure
    .input(
      z.object({
        where: TemplateWhereSchema.pick({ id: true }),
      })
    )
    .query(async ({ input }) => {
      const { where } = input
      const data = prismaFindUniqueTemplate({
        where,
      })
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No block with id '${where.id}'`,
        })
      }
      return data
    }),
  create: publicProcedure
    .input(
      z.object({
        payload: TemplateCreateSchema,
      })
    )
    .mutation(async ({ input }) => {
      const { payload } = input
      return prismaCreateTemplate({
        data: payload,
      })
    }),
  update: publicProcedure
    .input(
      z.object({
        where: TemplateWhereSchema.pick({ id: true }),
        payload: TemplateUpdateSchema.omit({ id: true }),
      })
    )
    .mutation(async ({ input }) => {
      const { where, payload } = input

      const data = prismaUpdateTemplate({
        where,
        data: payload,
      })
      return data
    }),
  delete: publicProcedure
    .input(
      z.object({
        where: TemplateWhereSchema.pick({ id: true }),
      })
    )
    .mutation(async ({ input }) => {
      const { where } = input
      const data = await prismaDeleteTemplate({
        where,
      })
      return data
    }),
})
