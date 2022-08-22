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
