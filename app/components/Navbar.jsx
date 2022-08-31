import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import { Send } from 'lucide-react'

export default function Navbar({
  handleDownload,
  previewSize,
  setPreviewSize,
}) {
  const handleSendEmail = () => {
    console.log('send email')
  }

  return (
    <Box
      position="fixed"
      top="0"
      right="0"
      left="0"
      h="16"
      bg="white"
      shadow="sm"
      borderBottomWidth="1px"
      borderBottomColor="gray.100"
      display="flex"
      px="8"
      zIndex="1"
    >
      <Flex
        position="absolute"
        left="0"
        right="0"
        align="center"
        justify="center"
        h="100%"
      >
        <ButtonGroup size="sm" isAttached>
          <Button
            colorScheme={previewSize === 'desktop' ? 'blue' : 'gray'}
            variant={previewSize === 'desktop' ? 'solid' : 'outline'}
            onClick={() => setPreviewSize('desktop')}
          >
            Desktop
          </Button>
          <Button
            colorScheme={previewSize === 'mobile' ? 'blue' : 'gray'}
            variant={previewSize === 'mobile' ? 'solid' : 'outline'}
            onClick={() => setPreviewSize('mobile')}
          >
            Mobile
          </Button>
        </ButtonGroup>
      </Flex>
      <Flex ml="auto" alignItems="center">
        <Button colorScheme="blue" onClick={handleDownload}>
          Download
        </Button>
        <Box ml="4">
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button isDisabled>Send Test</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <Flex p="4" alignItems="flex-end">
                <FormControl>
                  <FormLabel htmlFor="yourEmail">Your Email</FormLabel>
                  <Input id="yourEmail" type="email" />
                </FormControl>
                <IconButton
                  ml="2"
                  colorScheme="blue"
                  icon={<Icon boxSize="4" as={Send} />}
                  onClick={handleSendEmail}
                />
              </Flex>
            </PopoverContent>
          </Popover>
        </Box>
      </Flex>
    </Box>
  )
}
