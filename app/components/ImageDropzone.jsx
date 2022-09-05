import { useCallback, useState } from 'react'
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { X } from 'lucide-react'

export default function ImageDropzone({ onChange, value = '' }) {
  const [preview, setPreview] = useState(value)
  const onDrop = useCallback(
    (acceptedFiles) => {
      const objectUrl = URL.createObjectURL(acceptedFiles[0])
      onChange(objectUrl)
      setPreview(objectUrl)
    },
    [onChange]
  )

  const handleClearImage = () => {
    onChange('')
    setPreview('')
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    // isDragAccept,
    // isDragReject,
  } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  })

  return (
    <Flex rounded="md" overflow="hidden">
      {preview ? (
        <Box position="relative" boxSize="100%">
          <IconButton
            icon={<Icon boxSize="3.5" as={X} />}
            size="xs"
            position="absolute"
            top="2"
            right="2"
            onClick={handleClearImage}
          />
          <Image boxSize="100%" src={preview} objectFit="cover" alt="" />
        </Box>
      ) : (
        <Flex
          boxSize="100%"
          bg={isDragActive ? 'blue.100' : 'gray.100'}
          borderColor={isDragActive ? 'blue.200' : 'gray.200'}
          borderWidth="1px"
          align="center"
          justify="center"
          textAlign="center"
          fontWeight="semibold"
          transition="all 0.2s ease"
          cursor="pointer"
          {...getRootProps()}
        >
          <Input {...getInputProps()} />
          {isDragActive ? (
            <Text>Drop the files here ...</Text>
          ) : (
            <Text>Upload an Image</Text>
          )}
        </Flex>
      )}
    </Flex>
  )
}
