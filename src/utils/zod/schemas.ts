import { BlockType } from '@prisma/client'
import { z } from 'zod'

const textBlockSchema = z.object({
  type: z.literal(BlockType.TEXT),
  attributes: z.object({}),
})
const headingBlockSchema = z.object({
  type: z.union([
    z.literal(BlockType.H1),
    z.literal(BlockType.H2),
    z.literal(BlockType.H3),
  ]),
  attributes: z.object({}),
})
const imageBlockSchema = z.object({
  type: z.literal(BlockType.IMAGE),
  attributes: z.object({}),
})
const codeBlockSchema = z.object({
  type: z.literal(BlockType.CODE),
  attributes: z.object({}),
})
const dividerBlockSchema = z.object({
  type: z.literal(BlockType.DIVIDER),
  attributes: z.object({}),
})
const quoteBlockSchema = z.object({
  type: z.literal(BlockType.QUOTE),
  attributes: z.object({}),
})

export const defaultBlockSchema = z.object({
  id: z.coerce.number(),
  templateId: z.coerce.number(),
  value: z.string(),
  position: z.coerce.number(),
})
// TODO: Define schemas

export const userSchema = z.object({
  id: z.string().uuid(),
  stripeCustomerId: z.string(),
  stripeSubscriptionId: z.string().nullable(),
  role: z.enum(['SUPERADMIN', 'CUSTOMER']),
})

export const templateSchema = z.object({
  id: z.coerce.number(),
  membershipId: z.coerce.number(),
  title: z.string(),
})

export const blockSchema = z.union([
  textBlockSchema.merge(defaultBlockSchema),
  headingBlockSchema.merge(defaultBlockSchema),
  imageBlockSchema.merge(defaultBlockSchema),
  codeBlockSchema.merge(defaultBlockSchema),
  dividerBlockSchema.merge(defaultBlockSchema),
  quoteBlockSchema.merge(defaultBlockSchema),
])

export const membershipSchema = z
  .object({
    id: z.coerce.number(),
    role: z.enum(['OWNER', 'ADMIN', 'USER']),
    organizationId: z.coerce.number(),
    userId: z.string().uuid(),
  })
  .partial()

export const organizationSchema = z
  .object({
    id: z.coerce.number(),
    name: z.string(),
  })
  .partial()
