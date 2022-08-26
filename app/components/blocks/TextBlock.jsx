import { Box } from '@chakra-ui/react'
import Editor from '../Editor'

export default function TextBlock({ details, onChange }) {
  const handleChange = (value) => {
    onChange({
      ...details,
      value,
    })
  }
  return (
    <Box>
      <Editor value={details.value} onChange={handleChange} />
    </Box>
  )
}
