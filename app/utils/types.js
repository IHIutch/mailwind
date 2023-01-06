import {
  CodeBlock,
  DividerBlock,
  HeadingBlock,
  ImageBlock,
  QuoteBlock,
  TextBlock,
} from '~/components/blocks'
import {
  CodeSidebar,
  DividerSidebar,
  GlobalSidebar,
  HeadingSidebar,
  ImageSidebar,
  QuoteSidebar,
  TextSidebar,
} from '~/components/sidebars'

export const BlockType = {
  Text: 'TEXT',
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  Divider: 'DIVIDER',
  Quote: 'QUOTE',
  Image: 'IMAGE',
  Code: 'CODE',
}

export const blocks = {
  [BlockType.Text]: TextBlock,
  [BlockType.H1]: HeadingBlock,
  [BlockType.H2]: HeadingBlock,
  [BlockType.H3]: HeadingBlock,
  [BlockType.Divider]: DividerBlock,
  [BlockType.Quote]: QuoteBlock,
  [BlockType.Image]: ImageBlock,
  [BlockType.Code]: CodeBlock,
}

export const sidebars = {
  global: GlobalSidebar,
  [BlockType.Text]: TextSidebar,
  [BlockType.H1]: HeadingSidebar,
  [BlockType.H2]: HeadingSidebar,
  [BlockType.H3]: HeadingSidebar,
  [BlockType.Divider]: DividerSidebar,
  [BlockType.Quote]: QuoteSidebar,
  [BlockType.Image]: ImageSidebar,
  [BlockType.Code]: CodeSidebar,
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
    backgroundColor: 'transparent',
  },
  H1: {
    paddingTop: '0',
    paddingRight: '0',
    paddingBottom: '28px',
    paddingLeft: '0',
    fontSize: '36px',
    lineHeight: '40px',
    fontWeight: '800',
  },
  H2: {
    paddingTop: '26px',
    paddingRight: '0',
    paddingBottom: '20px',
    paddingLeft: '0',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '700',
  },
  H3: {
    paddingTop: '32px',
    paddingRight: '0',
    paddingBottom: '8px',
    paddingLeft: '0',
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: '600',
  },
  TEXT: {
    paddingTop: '12px',
    paddingRight: '0',
    paddingBottom: '12px',
    paddingLeft: '0',
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: '400',
  },
  CODE: {
    paddingTop: '8px',
    paddingRight: '0',
    paddingBottom: '8px',
    paddingLeft: '0',
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: '400',
  },
  DIVIDER: {
    paddingTop: '8px',
    paddingRight: '0',
    paddingBottom: '8px',
    paddingLeft: '0',
  },
  IMAGE: {
    paddingTop: '8px',
    paddingRight: '0',
    paddingBottom: '8px',
    paddingLeft: '0',
  },
}
