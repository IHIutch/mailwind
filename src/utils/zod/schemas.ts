import { z } from 'zod'

const textBlockSchema = z.any()
const headingBlockSchema = z.any()
const imageBlockSchema = z.any()
const codeBlockSchema = z.any()
const dividerBlockSchema = z.any()
const quoteBlockSchema = z.any()
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

export const blockSchema = z.object({
  id: z.coerce.number(),
  templateId: z.coerce.number(),
  type: z.string(),
  position: z.coerce.number(),
  attributes: z.union([
    textBlockSchema,
    imageBlockSchema,
    quoteBlockSchema,
    codeBlockSchema,
    dividerBlockSchema,
    headingBlockSchema,
  ]),
  value: z.string(),
})

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
