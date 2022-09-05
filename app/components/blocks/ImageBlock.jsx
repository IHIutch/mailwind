import { Box } from '@chakra-ui/react'
import ImageAddUrl from '../ImageAddUrl'

export default function ImageBlock({ value, onChange }) {
  return (
    <Box>
      <ImageAddUrl value={value} onChange={onChange} />
    </Box>
  )
}
