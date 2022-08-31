import { Box } from '@chakra-ui/react'
import Editor from '../Editor'

export default function TextBlock({ attributes, value, onChange }) {
  return (
    <Box>
      <Editor value={value} onChange={onChange} />
    </Box>
  )
}
