import { Box } from '@chakra-ui/react'
import Editor from '../Editor'

export default function QuoteBlock({ details, onChange }) {
  const handleChange = (value) => {
    onChange({
      ...details,
      value,
    })
  }
  return (
    <Box borderLeftWidth="4px" borderColor="gray.200" pl="3">
      <Editor value={details.value} onChange={handleChange} />
    </Box>
  )
}
