import { Box } from '@chakra-ui/react'
import Editor from '../Editor'

export default function CodeBlock({ details, onChange }) {
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
