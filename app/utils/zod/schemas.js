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
