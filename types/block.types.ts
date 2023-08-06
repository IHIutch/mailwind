import { type z } from 'zod'

import {
  type ButtonBlockSchema,
  type TextBlockSchema,
  type CodeBlockSchema,
  type HeadingBlockSchema,
  type DividerBlockSchema,
  type ImageBlockSchema,
  type UnionBlockSchema,
} from '@/utils/zod/schemas'

export type CodeBlockProps = z.infer<typeof CodeBlockSchema>
export type ButtonBlockProps = z.infer<typeof ButtonBlockSchema>
export type TextBlockProps = z.infer<typeof TextBlockSchema>
export type HeadingBlockProps = z.infer<typeof HeadingBlockSchema>
export type DividerBlockProps = z.infer<typeof DividerBlockSchema>
export type ImageBlockProps = z.infer<typeof ImageBlockSchema>
export type UnionBlockProps = z.infer<typeof UnionBlockSchema>
