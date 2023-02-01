/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc'
import { prisma } from '@/server/prisma'
import { templateSchema } from '@/utils/zod/schemas'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

/**
 * Default selector for Block.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultTemplateSelect = Prisma.validator<Prisma.TemplateSelect>()({
  id: true,
  title: true,
  membershipId: true,
  organizationId: true,
  createdAt: true,
  updatedAt: true,
  blocks: true,
})

export const templateRouter = router({
  byMembershipId: publicProcedure
    .input(
      z.object({
        membershipId: z.coerce.number(),
      })
    )
    .query(async ({ input }) => {
      const { membershipId } = input
      const data = await prisma.template.findMany({
        select: defaultTemplateSelect,
        where: { membershipId },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return data
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.coerce.number(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input
      const data = await prisma.template.findUnique({
        where: { id },
        select: defaultTemplateSelect,
      })
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No block with id '${id}'`,
        })
      }
      return data
    }),
  create: publicProcedure
    .input(z.object({ payload: templateSchema.omit({ id: true }) }))
    .mutation(async ({ input }) => {
      const { payload } = input
      const data = await prisma.template.create({
        data: payload,
        select: defaultTemplateSelect,
      })
      return data
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        payload: templateSchema.partial(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input
      const data = await prisma.template.update({
        where: { id },
        data: input,
        select: defaultTemplateSelect,
      })
      return data
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input
      const data = await prisma.template.delete({
        where: { id },
        select: defaultTemplateSelect,
      })
      return data
    }),
})
