import { AspectRatio } from '@chakra-ui/react'
import ImageDropzone from '../ImageDropzone'

export default function ImageBlock({ value, onChange }) {
  return (
    <AspectRatio height="200px">
      <ImageDropzone value={value} onChange={onChange} />
    </AspectRatio>
  )
}
