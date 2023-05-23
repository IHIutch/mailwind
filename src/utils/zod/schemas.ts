import { z } from 'zod'

import { BlockType, GlobalRole, MembershipRole } from '@prisma/client'

const sizeSchema = z.string().regex(/^([0-9]+px|0)$/i)
const hexColorSchema = z.string().regex(/^#[A-Fa-f0-9]{6}$/)
const fontWeightSchema = z
  .string()
  .regex(/^(100|200|300|400|500|600|700|800|900)$/)

export const textBlockSchema = z.object({
  type: z.literal(BlockType.TEXT),
  attributes: z.any(),
})
export const HeadingBlockSchema = z.object({
  type: z.union([
    z.literal(BlockType.H1),
    z.literal(BlockType.H2),
    z.literal(BlockType.H3),
  ]),
  attributes: z.object({
    paddingTop: sizeSchema,
    paddingRight: sizeSchema,
    paddingBottom: sizeSchema,
    paddingLeft: sizeSchema,
    fontSize: sizeSchema,
    fontWeight: fontWeightSchema,
    lineHeight: sizeSchema,
    color: hexColorSchema,
    backgroundColor: hexColorSchema,
  }),
})
export const imageBlockSchema = z.object({
  type: z.literal(BlockType.IMAGE),
  attributes: z.any(),
})
export const codeBlockSchema = z.object({
  type: z.literal(BlockType.CODE),
  attributes: z.any(),
})
export const DividerBlockSchema = z.object({
  type: z.literal(BlockType.DIVIDER),
  attributes: z.object({
    paddingTop: sizeSchema,
    paddingRight: sizeSchema,
    paddingBottom: sizeSchema,
    paddingLeft: sizeSchema,
    borderWidth: sizeSchema,
    borderTopColor: hexColorSchema,
    backgroundColor: hexColorSchema,
    borderTopWidth: sizeSchema,
  }),
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

export const UserWhereSchema = z.object({
  id: z.coerce.string().optional(),
})

export const UserCreateSchema = z.object({
  id: z.coerce.string(),
  stripeSubscriptionId: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  role: z.nativeEnum(GlobalRole),
})

export const UserUpdateSchema = z.object({
  id: z.coerce.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  role: z.nativeEnum(GlobalRole),
})

export const BlockWhereSchema = z.object({
  id: z.coerce.number().optional(),
  templateId: z.coerce.number().optional(),
})

export const BlockCreateSchema = z.object({
  type: z.nativeEnum(BlockType),
  templateId: z.number(),
  position: z.string(),
  attributes: z.any().optional(),
  value: z.string().optional(),
})

export const BlockUpdateSchema = z.object({
  id: z.coerce.number().optional(),
  type: z.nativeEnum(BlockType).optional(),
  templateId: z.number().optional(),
  position: z.string().optional(),
  attributes: z.any().optional(),
  value: z.string().optional(),
})

export const TemplateWhereSchema = z.object({
  id: z.coerce.number().optional(),
  organizationId: z.coerce.number().optional(),
})

export const TemplateCreateSchema = z.object({
  title: z.coerce.string().optional(),
  organizationId: z.coerce.number(),
})

export const TemplateUpdateSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.coerce.string().optional(),
  organizationId: z.coerce.number().optional(),
})

export const MembershipWhereSchema = z.object({
  id: z.coerce.number().optional(),
  organizationId: z.coerce.number().optional(),
  userId: z.coerce.string().uuid().optional(),
})

export const MembershipCreateSchema = z.object({
  userId: z.coerce.string().uuid(),
  organizationId: z.coerce.number(),
  role: z.nativeEnum(MembershipRole),
})

export const MembershipUpdateSchema = z.object({
  userId: z.coerce.string().uuid().optional(),
  organizationId: z.coerce.number().optional(),
  role: z.nativeEnum(MembershipRole).optional(),
})

export const OrganizationWhereSchema = z.object({
  id: z.coerce.number().optional(),
})

export const OrganizationCreateSchema = z.object({
  name: z.coerce.string(),
})

export const OrganizationUpdateSchema = z.object({
  name: z.coerce.string().optional(),
})

export const blockSchema = z.union([
  textBlockSchema.merge(defaultBlockSchema),
  HeadingBlockSchema.merge(defaultBlockSchema),
  imageBlockSchema.merge(defaultBlockSchema),
  codeBlockSchema.merge(defaultBlockSchema),
  DividerBlockSchema.merge(defaultBlockSchema),
  quoteBlockSchema.merge(defaultBlockSchema),
])
