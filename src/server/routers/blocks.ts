import { z } from 'zod'

import {
  prismaCreateBlock,
  prismaDeleteBlock,
  prismaFindBlocks,
  prismaFindUniqueBlock,
  prismaUpdateBlock,
} from '@/utils/prisma/blocks'
import {
  BlockCreateSchema,
  BlockUpdateSchema,
  BlockWhereSchema,
} from '@/utils/zod/schemas'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'

export const blockRouter = router({
  byTemplateId: publicProcedure
    .input(
      z.object({
        where: BlockWhereSchema.pick({ templateId: true }),
      })
    )
    .query(async ({ input }) => {
      const { where } = input
      const data = prismaFindBlocks({
        where,
      })
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No block with templateId '${where.templateId}'`,
        })
      }
      return data
    }),
  byId: publicProcedure
    .input(
      z.object({
        where: BlockWhereSchema.pick({ id: true }),
      })
    )
    .query(async ({ input }) => {
      const { where } = input
      const data = prismaFindUniqueBlock({
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
        payload: BlockCreateSchema,
      })
    )
    .mutation(async ({ input }) => {
      const { payload } = input
      const data = prismaCreateBlock({
        data: payload,
      })
      return data
    }),
  update: publicProcedure
    .input(
      z.object({
        where: BlockWhereSchema.pick({ id: true }),
        payload: BlockUpdateSchema.omit({ id: true }),
      })
    )
    .mutation(async ({ input }) => {
      const { where, payload } = input
      const data = prismaUpdateBlock({
        where,
        data: payload,
      })
      return data
    }),
  delete: publicProcedure
    .input(
      z.object({
        where: BlockWhereSchema.pick({ id: true }),
      })
    )
    .mutation(async ({ input }) => {
      const { where } = input
      const data = prismaDeleteBlock({
        where,
      })
      return data
    }),
})
