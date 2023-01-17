import { BlockType, defaultAttributes } from './types'

export const defaultBlocks = [
  {
    type: BlockType.H1,
    value: '<p>Get Started</p>',
    attributes: {
      ...defaultAttributes[BlockType.H1],
    },
  },
  {
    type: BlockType.Divider,
  },
  {
    type: BlockType.Text,
    value:
      '<p>👋 Welcome! This is a private page for you to play around with.</p>',
    attributes: {
      ...defaultAttributes[BlockType.Text],
    },
  },
  {
    type: BlockType.Text,
    value: '<p>Give these things a try:</p>',
    attributes: {
      ...defaultAttributes[BlockType.Text],
    },
  },
  {
    type: BlockType.Text,
    value: '<p>1. Hover on the left of each line for quick actions</p>',
    attributes: {
      ...defaultAttributes[BlockType.Text],
    },
  },

  {
    type: BlockType.Text,
    value: '<p>2. Click on the + button to add a new line</p>',
    attributes: {
      ...defaultAttributes[BlockType.Text],
    },
  },
  {
    type: BlockType.Text,
    value: '<p>3. Drag the ⋮⋮ button to reorder</p>',
    attributes: {
      ...defaultAttributes[BlockType.Text],
    },
  },
  {
    type: BlockType.Text,
    value: '<p>4. Click the trash icon to delete this block</p>',
    attributes: {
      ...defaultAttributes[BlockType.Text],
    },
  },
  {
    type: BlockType.Text,
    value:
      '<p>5. <strong>Bold</strong> and <em>italicize</em> using markdown e.g. *italic* or **bold**</p>',
    attributes: {
      ...defaultAttributes[BlockType.Text],
    },
  },
  {
    type: BlockType.Text,
    value:
      "<p>6. Add headers and dividers with '#', '##' or '---' followed by a space</p>",
    attributes: {
      ...defaultAttributes[BlockType.Text],
    },
  },
  {
    type: BlockType.Text,
    value:
      "<p>7. Type '/' for a menu to quickly switch blocks and search by typing</p>",
    attributes: {
      ...defaultAttributes[BlockType.Text],
    },
  },
]
