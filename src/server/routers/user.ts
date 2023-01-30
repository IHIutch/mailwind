/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc'
import { prisma } from '@/server/prisma'
import { userSchema } from '@/utils/zod/schemas'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

/**
 * Default selector for Block.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  stripeSubscriptionId: true,
  stripeCustomerId: true,
  role: true,
  memberships: {
    select: {
      id: true,
    },
  },
})

export const userRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input
      const data = await prisma.user.findUnique({
        where: { id },
        select: defaultUserSelect,
      })
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No block with id '${id}'`,
        })
      }
      return data
    }),
  create: publicProcedure.input(userSchema).mutation(async ({ input }) => {
    const data = await prisma.user.create({
      data: input,
      select: defaultUserSelect,
    })
    return data
  }),
  update: publicProcedure.input(userSchema).mutation(async ({ input }) => {
    const { id } = input
    const data = await prisma.user.update({
      where: { id },
      data: input,
      select: defaultUserSelect,
    })
    return data
  }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input
      const data = await prisma.user.delete({
        where: { id },
        select: defaultUserSelect,
      })
      return data
    }),
})
