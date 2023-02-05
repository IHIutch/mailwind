import { router, publicProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import {
  TemplateCreateSchema,
  TemplateUpdateSchema,
  TemplateWhereSchema,
} from '@/utils/zod/schemas'
import {
  prismaCreateTemplate,
  prismaDeleteTemplate,
  prismaFindTemplates,
  prismaFindUniqueTemplate,
  prismaUpdateTemplate,
} from '@/utils/prisma/templates'

export const templateRouter = router({
  byOrganizationId: publicProcedure
    .input(
      z.object({
        where: TemplateWhereSchema.pick({ organizationId: true }),
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
      const data = prismaCreateTemplate({
        data: payload,
      })
      return data
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
