import { BlockType, Prisma } from '@prisma/client'
import { z } from 'zod'
import { toZod } from 'tozod'

export const textBlockSchema = z.object({
  type: z.literal(BlockType.TEXT),
  attributes: z.any(),
})
export const headingBlockSchema = z.object({
  type: z.union([
    z.literal(BlockType.H1),
    z.literal(BlockType.H2),
    z.literal(BlockType.H3),
  ]),
  attributes: z.any(),
})
export const imageBlockSchema = z.object({
  type: z.literal(BlockType.IMAGE),
  attributes: z.any(),
})
export const codeBlockSchema = z.object({
  type: z.literal(BlockType.CODE),
  attributes: z.any(),
})
export const dividerBlockSchema = z.object({
  type: z.literal(BlockType.DIVIDER),
  attributes: z.any(),
})
export const quoteBlockSchema = z.object({
  type: z.literal(BlockType.QUOTE),
  attributes: z.any(),
})

export const defaultBlockSchema = z.object({
  id: z.coerce.number(),
  templateId: z.coerce.number(),
  value: z.string(),
  position: z.string(),
})
// TODO: Define schemas

export const userSchema = z.object({
  id: z.string().uuid(),
  stripeCustomerId: z.string().nullable(),
  stripeSubscriptionId: z.string().nullable(),
  role: z.enum(['SUPERADMIN', 'CUSTOMER']),
})

export const UserWhereUniqueSchema: toZod<Prisma.UserWhereUniqueInput> =
  z.object({
    id: z.string().optional(),
    stripeSubscriptionId: z.string().optional(),
    stripeCustomerId: z.string().optional(),
  })

export const UserCreateSchema: toZod<Prisma.UserCreateWithoutMembershipsInput> =
  z.object({
    id: z.string(),
    stripeSubscriptionId: z.string().optional(),
    stripeCustomerId: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
    role: z.NEVER,
  })

export const UserUpdateSchema: toZod<Prisma.UserUpdateWithoutMembershipsInput> =
  z.object({
    id: z.string().optional(),
    stripeSubscriptionId: z.string().optional(),
    stripeCustomerId: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
    role: z.NEVER,
  })

export const templateSchema = z.object({
  id: z.coerce.number(),
  organizationId: z.coerce.number(),
  title: z.string().nullable(),
})

export const blockSchema = z.union([
  textBlockSchema.merge(defaultBlockSchema),
  headingBlockSchema.merge(defaultBlockSchema),
  imageBlockSchema.merge(defaultBlockSchema),
  codeBlockSchema.merge(defaultBlockSchema),
  dividerBlockSchema.merge(defaultBlockSchema),
  quoteBlockSchema.merge(defaultBlockSchema),
])

export const membershipSchema = z.object({
  id: z.coerce.number(),
  role: z.enum(['OWNER', 'ADMIN', 'USER']),
  organizationId: z.coerce.number(),
  userId: z.string().uuid(),
})

export const organizationSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
})
