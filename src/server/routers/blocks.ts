/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc'
import { prisma } from '@/server/prisma'
import { blockSchema } from '@/utils/zod/schemas'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'

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

export const blockRouter = router({
  byTemplateId: publicProcedure.input(blockSchema).query(async ({ input }) => {
    const { templateId } = input
    const data = await prisma.block.findMany({
      select: defaultBlockSelect,
      where: { templateId },
      orderBy: {
        position: 'desc',
      },
    })

    return data
  }),
  byId: publicProcedure.input(blockSchema).query(async ({ input }) => {
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
  create: publicProcedure.input(blockSchema).mutation(async ({ input }) => {
    const data = await prisma.block.create({
      data: {
        type: input.type,
        attributes: input.attributes,
        templateId: input.templateId,
        position: input.position,
      },
      select: defaultBlockSelect,
    })
    return data
  }),
  update: publicProcedure.input(blockSchema).mutation(async ({ input }) => {
    const { id } = input
    const data = await prisma.block.update({
      where: { id },
      data: {
        type: input.type,
        attributes: input.attributes,
        templateId: input.templateId,
        position: input.position,
      },
      select: defaultBlockSelect,
    })
    return data
  }),
  delete: publicProcedure.input(blockSchema).mutation(async ({ input }) => {
    const { id } = input
    const data = await prisma.block.delete({
      where: { id },
      select: defaultBlockSelect,
    })
    return data
  }),
})
