import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import { HexColorPicker } from 'react-colorful'
import debounce from 'lodash/debounce'
import { useCallback, useState } from 'react'

export default function ColorPicker({ value, onChange }) {
  const [color, setColor] = useState(value) // This is needed to update the background color for some reason
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(debounce(onChange, 500), [onChange])

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
          <Box h="8" w="100%" rounded="md" bg={color} />
        </Button>
      </PopoverTrigger>
      <PopoverContent width="fit-content" p="1">
        <PopoverArrow />
        <HexColorPicker
          color={color}
          onChange={(value) => {
            setColor(value)
            handleChange(value)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
