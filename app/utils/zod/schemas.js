import { z } from 'zod'

export const userSchema = z
  .object({
    id: z.coerce.string().uuid(),
    stripeCustomerId: z.string(),
    stripeSubscriptionId: z.coerce.string().nullable(),
    role: z.enum(['SUPERADMIN', 'CUSTOMER']),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .partial()

export const templateSchema = z
  .object({
    id: z.coerce.number(),
    membershipId: z.coerce.number(),
    title: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .partial()

export const blockSchema = z
  .object({
    id: z.coerce.number(),
    templateId: z.coerce.number(),
    position: z.coerce.number(),
    attributes: z.object(), // TODO: Create a union using various block specific schemas
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .partial()

export const membershipSchema = z
  .object({
    id: z.coerce.number(),
    role: z.enum(['OWNER', 'ADMIN', 'USER']),
    organizationId: z.coerce.number(),
    userId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .partial()

export const organizationSchema = z
  .object({
    id: z.coerce.number(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .partial()
