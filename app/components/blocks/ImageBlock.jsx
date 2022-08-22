import { AspectRatio } from '@chakra-ui/react'
import ImageDropzone from '../ImageDropzone'

export default function ImageBlock({ details, onChange }) {
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
