import { z } from 'zod'

export const userSchema = z
  .object({
    id: z.string().uuid(),
    stripeCustomerId: z.string(),
    stripeSubscriptionId: z.string().nullable(),
    role: z.enum(['SUPERADMIN', 'CUSTOMER']),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .partial()

export const templateSchema = z
  .object({
    id: z.number(),
    membershipId: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .partial()

export const blockSchema = z
  .object({
    id: z.number(),
    templateId: z.number(),
    position: z.number(),
    attributes: z.object(), // TODO: Create a union using various block specific schemas
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .partial()

export const membershipSchema = z
  .object({
    id: z.number(),
    role: z.enum(['OWNER', 'ADMIN', 'USER']),
    organizationId: z.number(),
    userId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .partial()

export const organizationSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .partial()
