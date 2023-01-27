/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc'
import { prisma } from '@/server/prisma'
import { blockSchema } from '@/utils/zod/schemas'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

/**
 * Default selector for Block.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultBlockSelect = Prisma.validator<Prisma.BlockSelect>()({
  id: true,
  type: true,
  attributes: true,
  templateId: true,
  position: true,
})

// const validWhereParams = blockSchema.pick({ id: true, templateId: true })
// type validWhereParams = z.infer<typeof validWhereParams>

// const validWhere = ({ id, templateId }: validWhereParams) => {
//   return Prisma.validator<Prisma.BlockWhereInput>()({
//     id,
//     templateId,
//   })
// }

export const blockRouter = router({
  byTemplateId: publicProcedure
    .input(
      z.object({
        templateId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { templateId } = input
      const data = await prisma.block.findMany({
        select: defaultBlockSelect,
        where: { templateId },
        orderBy: {
          position: 'desc',
        },
      })
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No block with templateId '${templateId}'`,
        })
      }
      return data
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input
      const data = await prisma.block.findUnique({
        where: { id },
        select: defaultBlockSelect,
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
    .input(
      blockSchema.omit({
        id: true,
      })
    )
    .mutation(async ({ input }) => {
      const data = await prisma.block.create({
        data: input,
        select: defaultBlockSelect,
      })
      return data
    }),
  update: publicProcedure.input(blockSchema).mutation(async ({ input }) => {
    const { id } = input
    const data = await prisma.block.update({
      where: { id },
      data: input,
      select: defaultBlockSelect,
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
      const data = await prisma.block.delete({
        where: { id },
        select: defaultBlockSelect,
      })
      return data
    }),
})
