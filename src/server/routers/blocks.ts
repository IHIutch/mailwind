import { router, publicProcedure } from '../trpc'
import { prisma } from '@/server/prisma'
import {
  blockSchema,
  codeBlockSchema,
  defaultBlockSchema,
  dividerBlockSchema,
  headingBlockSchema,
  imageBlockSchema,
  quoteBlockSchema,
  textBlockSchema,
} from '@/utils/zod/schemas'
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
  value: true,
  templateId: true,
  position: true,
})

export type SingleBlockPayloadType = Prisma.BlockGetPayload<{
  select: typeof defaultBlockSelect
}>

const partialBlockSchemas = z.union([
  textBlockSchema.merge(defaultBlockSchema).omit({ id: true }).partial(),
  headingBlockSchema.merge(defaultBlockSchema).omit({ id: true }).partial(),
  imageBlockSchema.merge(defaultBlockSchema).omit({ id: true }).partial(),
  codeBlockSchema.merge(defaultBlockSchema).omit({ id: true }).partial(),
  dividerBlockSchema.merge(defaultBlockSchema).omit({ id: true }).partial(),
  quoteBlockSchema.merge(defaultBlockSchema).omit({ id: true }).partial(),
])

const ReorderBlockSchemas = z.array(
  defaultBlockSchema.pick({ id: true, position: true })
)

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
          position: 'asc',
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
    .input(z.object({ payload: blockSchema }))
    .mutation(async ({ input }) => {
      const { payload } = input
      const data = await prisma.block.create({
        data: payload,
        select: defaultBlockSelect,
      })
      return data
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        payload: partialBlockSchemas,
      })
    )
    .mutation(async ({ input }) => {
      const { id, payload } = input
      const data = await prisma.block.update({
        where: { id },
        data: payload,
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
  reorder: publicProcedure
    .input(
      z.object({
        payload: ReorderBlockSchemas,
      })
    )
    .mutation(async ({ input }) => {
      const { payload } = input
      const data = await prisma.$transaction(
        payload.map((b) =>
          prisma.block.update({
            data: b,
            where: {
              id: b.id,
            },
            select: defaultBlockSelect,
          })
        )
      )
      return data
    }),
})
