import { z } from 'zod'

import { BlockType, GlobalRole, MembershipRole } from '@prisma/client'

const spaceSchema = z.string().regex(/^([0-9]+px|0)$/i)
const sizeSchema = z.string().regex(/^(\d+px|\d+%|0)$/)
const hexColorSchema = z.string().regex(/^#[A-Fa-f0-9]{6}$/)
const fontWeightSchema = z.string().regex(/^[1-9]00$/)
const fontFamilySchema = z.string()

export const TextBlockSchema = z.object({
  value: z.string(),
  type: z.literal(BlockType.TEXT),
  attributes: z.object({
    paddingTop: spaceSchema,
    paddingRight: spaceSchema,
    paddingBottom: spaceSchema,
    paddingLeft: spaceSchema,
    fontSize: spaceSchema,
    fontWeight: fontWeightSchema,
    lineHeight: spaceSchema,
    color: hexColorSchema,
    backgroundColor: hexColorSchema,
    fontFamily: fontFamilySchema,
  }),
})

export const ButtonBlockSchema = z.object({
  value: z.string(),
  type: z.literal(BlockType.TEXT),
  attributes: z.object({
    paddingTop: spaceSchema,
    paddingRight: spaceSchema,
    paddingBottom: spaceSchema,
    paddingLeft: spaceSchema,
    innerPaddingTop: spaceSchema,
    innerPaddingRight: spaceSchema,
    innerPaddingBottom: spaceSchema,
    innerPaddingLeft: spaceSchema,
    href: z.string().url(),
    fontSize: spaceSchema,
    fontWeight: fontWeightSchema,
    lineHeight: spaceSchema,
    color: hexColorSchema,
    backgroundColor: hexColorSchema,
    containerBackgroundColor: hexColorSchema,
    fontFamily: fontFamilySchema,
    width: spaceSchema,
    align: z.union([
      z.literal('left'),
      z.literal('center'),
      z.literal('right'),
    ]),
  }),
})

export const HeadingBlockSchema = z.object({
  value: z.string(),
  type: z.union([
    z.literal(BlockType.H1),
    z.literal(BlockType.H2),
    z.literal(BlockType.H3),
  ]),
  attributes: z.object({
    paddingTop: spaceSchema,
    paddingRight: spaceSchema,
    paddingBottom: spaceSchema,
    paddingLeft: spaceSchema,
    fontSize: spaceSchema,
    fontWeight: fontWeightSchema,
    lineHeight: spaceSchema,
    color: hexColorSchema,
    backgroundColor: hexColorSchema,
    fontFamily: fontFamilySchema,
  }),
})

export const ImageBlockSchema = z.object({
  type: z.literal(BlockType.IMAGE),
  attributes: z.object({
    paddingTop: spaceSchema,
    paddingRight: spaceSchema,
    paddingBottom: spaceSchema,
    paddingLeft: spaceSchema,
    src: z.string().url(),
    alt: z.string(),
    height: sizeSchema,
    width: sizeSchema,
    backgroundColor: hexColorSchema,
  }),
})

export const CodeBlockSchema = z.object({
  value: z.string(),
  type: z.literal(BlockType.CODE),
  attributes: z.any(),
})

export const DividerBlockSchema = z.object({
  type: z.literal(BlockType.DIVIDER),
  attributes: z.object({
    paddingTop: spaceSchema,
    paddingRight: spaceSchema,
    paddingBottom: spaceSchema,
    paddingLeft: spaceSchema,
    borderWidth: spaceSchema,
    borderTopWidth: spaceSchema,
    borderTopColor: hexColorSchema,
    backgroundColor: hexColorSchema,
  }),
})

// export const QuoteBlockSchema = z.object({
//   type: z.literal(BlockType.QUOTE),
//   attributes: z.any(),
// })

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
  membershipId: z.coerce.number().optional(),
})

export const TemplateCreateSchema = z.object({
  title: z.coerce.string().optional(),
  membershipId: z.coerce.number(),
})

export const TemplateUpdateSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.coerce.string().optional(),
  membershipId: z.coerce.number().optional(),
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
  id: z.coerce.number().optional(),
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
  id: z.coerce.number().optional(),
  name: z.coerce.string().optional(),
})
