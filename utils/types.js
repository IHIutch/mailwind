import { AspectRatio, Box } from '@chakra-ui/react'
import Editor from '~/components/Editor'
import ImageDropzone from '~/components/ImageDropzone'

const TextBlock = ({ details, onChange }) => {
  const handleChange = (value) => {
    onChange({
      ...details,
      value,
    })
  }
  return <Editor value={details.value} onChange={handleChange} />
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
    <Box py="3">
      <Box borderTopWidth="1px" borderColor="gray.200" />
    </Box>
  )
  // return <div>{details?.value}</div>
}

const QuoteBlock = ({ details }) => {
  return <div>{JSON.stringify(details)}</div>
  // return <div>{details?.value}</div>
}

const ImageBlock = ({ details, onChange }) => {
  const handleChange = (value) => {
    onChange({
      ...details,
      value,
    })
  }
  return (
    <AspectRatio ratio={16 / 9} w="72">
      <ImageDropzone value={details.value} onChange={handleChange} />
    </AspectRatio>
  )
}

const CodeBlock = ({ details, onChange }) => {
  const replaceHtml = (value) => {
    return value.replace(/(<([^>]+)>)/gi, '')
  }

  const handleChange = (value) => {
    onChange({
      ...details,
      value: replaceHtml(value),
    })
  }
  return (
    <Box rounded="md" bg="blackAlpha.50" p="2">
      <Editor
        value={`<code><pre>${replaceHtml(details.value)}</code></pre>`}
        onChange={handleChange}
      />
    </Box>
  )
}

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
