import { type Language } from 'prism-react-renderer'

import {
  type IMjmlButtonProps,
  type IMjmlDividerProps,
  type IMjmlImageProps,
  type IMjmlTextProps,
} from '@faire/mjml-react'
import { type BlockType } from '@prisma/client'
import { type CodeBlockAttributeProps } from './block.types'

export type MjmlTextBlockProps = {
  id: number
  value: string
  attributes: IMjmlTextProps
}

export type MjmlButtonBlockProps = {
  id: number
  value: string
  attributes: IMjmlButtonProps
}
export type MjmlCodeBlockProps = {
  id: number
  value: string
  attributes: IMjmlTextProps & CodeBlockAttributeProps
}

export type MjmlHeadingBlockProps = {
  id: number
  value: string
  type: typeof BlockType.H1 | typeof BlockType.H2 | typeof BlockType.H3
  attributes: IMjmlTextProps
}
export type MjmlDividerBlockProps = {
  id: number
  attributes: IMjmlDividerProps
}

export type MjmlImageBlockProps = {
  id: number
  attributes: IMjmlImageProps
}
