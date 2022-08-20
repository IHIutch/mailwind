import { Box, StackDivider } from '@chakra-ui/react'
import Editor from '~/components/Editor'

const TextBlock = ({ details, onChange }) => {
  return <Editor value={details.value} onChange={onChange} />
}

const HeadingBlock = ({ type, details, onChange }) => {
  const handleChange = (value) => {
    onChange({
      ...details,
      value,
    })
  }

  const headingConfig = {
    [BlockType.H1]: {
      // placeholder: 'Heading 1',
      fontSize: '4xl',
      // fontWeight: 'semibold',
    },
    [BlockType.H2]: {
      // placeholder: 'Heading 2',
      fontSize: '3xl',
      // fontWeight: 'medium',
    },
    [BlockType.H3]: {
      // placeholder: 'Heading 3',
      fontSize: '2xl',
      // fontWeight: 'medium',
    },
  }
  return (
    <Box {...headingConfig[type]}>
      <Editor value={details.value} onChange={handleChange} />
    </Box>
  )
  // return <h1>{details?.value}</h1>
}

const DividerBlock = ({ details }) => {
  return (
    <Box p="4">
      <Box borderTopWidth="1px" borderColor="gray.200" />
    </Box>
  )
  // return <div>{details?.value}</div>
}

const QuoteBlock = ({ details }) => {
  return <div>{JSON.stringify(details)}</div>
  // return <div>{details?.value}</div>
}

export const BlockType = {
  Text: 'TEXT',
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  Divider: 'DIVIDER',
  Quote: 'QUOTE',
}

export const components = {
  [BlockType.Text]: TextBlock,
  [BlockType.H1]: HeadingBlock,
  [BlockType.H2]: HeadingBlock,
  [BlockType.H3]: HeadingBlock,
  [BlockType.Divider]: DividerBlock,
  [BlockType.Quote]: QuoteBlock,
}
