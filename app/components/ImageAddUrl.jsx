import { useState, useRef } from 'react'
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { Image as ImageIcon, X } from 'lucide-react'

export default function ImageDropzone({ onChange, value = '' }) {
  const [preview, setPreview] = useState(value)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef()

  const handleSubmit = () => {
    const isValid = inputRef.current.checkValidity()
    if (isValid) {
      onChange(imageUrl)
      setPreview(imageUrl)
      setError('')
    } else {
      setError('Not a valid URL')
    }
  }

  const handleClearImage = () => {
    onChange('')
    setPreview('')
  }

  return (
    <Box rounded="md" overflow="hidden">
      {preview ? (
        <Box position="relative">
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
        <AspectRatio height="200px" w="100%">
          <Center
            boxSize="100%"
            p="2"
            bg="gray.100"
            borderColor="gray.200"
            borderWidth="1px"
          >
            <FormControl isInvalid={error}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon boxSize="3.5" as={ImageIcon} />
                </InputLeftElement>
                <Input
                  ref={inputRef}
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  bg="white"
                  type="url"
                />
                <InputRightElement w="auto" px="1">
                  <Button colorScheme="blue" size="sm" onClick={handleSubmit}>
                    Submit
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
          </Center>
        </AspectRatio>
      )}
    </Box>
  )
}
