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
    <AspectRatio height="200px">
      <ImageDropzone value={details.value} onChange={handleChange} />
    </AspectRatio>
  )
}
