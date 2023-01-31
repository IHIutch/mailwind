import {
  CodeBlock,
  DividerBlock,
  HeadingBlock,
  ImageBlock,
  QuoteBlock,
  TextBlock,
} from '@/components/blocks'
import {
  CodeSidebar,
  DividerSidebar,
  GlobalSidebar,
  HeadingSidebar,
  ImageSidebar,
  QuoteSidebar,
  TextSidebar,
} from '@/components/sidebars'
import { BlockType } from '@prisma/client'

export const blocks = {
  [BlockType.TEXT]: TextBlock,
  [BlockType.H1]: HeadingBlock,
  [BlockType.H2]: HeadingBlock,
  [BlockType.H3]: HeadingBlock,
  [BlockType.DIVIDER]: DividerBlock,
  [BlockType.QUOTE]: QuoteBlock,
  [BlockType.IMAGE]: ImageBlock,
  [BlockType.CODE]: CodeBlock,
}

export const sidebars = {
  GLOBAL: GlobalSidebar,
  [BlockType.TEXT]: TextSidebar,
  [BlockType.H1]: HeadingSidebar,
  [BlockType.H2]: HeadingSidebar,
  [BlockType.H3]: HeadingSidebar,
  [BlockType.DIVIDER]: DividerSidebar,
  [BlockType.QUOTE]: QuoteSidebar,
  [BlockType.IMAGE]: ImageSidebar,
  [BlockType.CODE]: CodeSidebar,
}

export const defaultAttributes = {
  GLOBAL: {
    paddingTop: '8px',
    paddingRight: '0',
    paddingBottom: '8px',
    paddingLeft: '0',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
    fontSize: '16px',
    lineHeight: '1.5',
    backgroundColor: '#ffffff',
  },
  [BlockType.H1]: {
    paddingTop: '0',
    paddingRight: '0',
    paddingBottom: '28px',
    paddingLeft: '0',
    fontSize: '36px',
    lineHeight: '40px',
    fontWeight: '800',
  },
  [BlockType.H2]: {
    paddingTop: '26px',
    paddingRight: '0',
    paddingBottom: '20px',
    paddingLeft: '0',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '700',
  },
  [BlockType.H3]: {
    paddingTop: '32px',
    paddingRight: '0',
    paddingBottom: '8px',
    paddingLeft: '0',
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: '600',
  },
  [BlockType.TEXT]: {
    paddingTop: '12px',
    paddingRight: '0',
    paddingBottom: '12px',
    paddingLeft: '0',
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: '400',
  },
  [BlockType.CODE]: {
    paddingTop: '8px',
    paddingRight: '0',
    paddingBottom: '8px',
    paddingLeft: '0',
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: '400',
  },
  [BlockType.DIVIDER]: {
    paddingTop: '8px',
    paddingRight: '0',
    paddingBottom: '8px',
    paddingLeft: '0',
  },
  [BlockType.IMAGE]: {
    paddingTop: '8px',
    paddingRight: '0',
    paddingBottom: '8px',
    paddingLeft: '0',
  },
}
