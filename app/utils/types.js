import CodeBlock from '~/components/blocks/CodeBlock'
import DividerBlock from '~/components/blocks/DividerBlock'
import HeadingBlock from '~/components/blocks/HeadingBlock'
import ImageBlock from '~/components/blocks/ImageBlock'
import QuoteBlock from '~/components/blocks/QuoteBlock'
import TextBlock from '~/components/blocks/TextBlock'

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

export const components = {
  [BlockType.Text]: TextBlock,
  [BlockType.H1]: HeadingBlock,
  [BlockType.H2]: HeadingBlock,
  [BlockType.H3]: HeadingBlock,
  [BlockType.Divider]: DividerBlock,
  [BlockType.Quote]: QuoteBlock,
  [BlockType.Image]: ImageBlock,
  [BlockType.Code]: CodeBlock,
}

export const defaultAttributes = {
  global: {
    padding: ['8px', '0', '8px', '0'],
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
    fontSize: '16px',
    lineHeight: '1.5',
  },
  H1: {
    padding: ['0', '0', '28px', '0'],
    fontSize: '36px',
    lineHeight: '40px',
    fontWeight: 800,
  },
  H2: {
    padding: ['36px', '0', '20px', '0'],
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 700,
  },
  H3: {
    padding: ['32px', '0', '8px', '0'],
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: 600,
  },
}
