import { Box } from '@chakra-ui/react'
import Editor from '../Editor'

export default function QuoteBlock({ value, onChange }) {
  return (
    <Box borderLeftWidth="4px" borderColor="gray.200" pl="3">
      <Editor value={value} onChange={onChange} />
    </Box>
  )
}
