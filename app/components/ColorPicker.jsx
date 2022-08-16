import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import { HexColorPicker } from 'react-colorful'
export default function ColorPicker({ value, onChange }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="link"
          borderWidth="1px"
          borderColor="gray.200"
          w="100%"
          p="1"
        >
          <Box h="8" w="100%" rounded="md" bg={value} />
        </Button>
      </PopoverTrigger>
      <PopoverContent width="fit-content" p="1">
        <PopoverArrow />
        <HexColorPicker color={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  )
}
