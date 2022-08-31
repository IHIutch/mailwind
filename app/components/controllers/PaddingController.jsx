import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
} from '@chakra-ui/react'
import debounce from 'lodash/debounce'
import { useCallback } from 'react'

const PaddingController = ({ value = ['0', '0', '0', '0'], onChange }) => {
  const top = value?.[0] || '0'
  const right = value?.[1] || '0'
  const bottom = value?.[2] || '0'
  const left = value?.[3] || '0'

  const handleChange = (idx, payload) => {
    const newValue = [...value]
    newValue[idx] = payload === '0' ? payload : payload + 'px'
    onChange(newValue)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateDebounce = useCallback(debounce(handleChange, 250), [
    handleChange,
  ])

  return (
    <Box as="fieldset">
      <Heading as="legend" mb="2" fontSize="sm" fontWeight="semibold">
        Padding
      </Heading>
      <SimpleGrid columns="2" rowGap="2" columnGap="4">
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <FormLabel mb="0" mr="1" fontSize="sm">
            Top
          </FormLabel>
          <NumberInput
            display="block"
            onChange={(value) => handleUpdateDebounce(0, value)}
            defaultValue={top}
            w="20"
            ml="auto"
            size="sm"
            min="0"
          >
            <NumberInputField pl="2" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <FormLabel mb="0" mr="1" fontSize="sm">
            Right
          </FormLabel>
          <NumberInput
            display="block"
            onChange={(value) => handleUpdateDebounce(1, value)}
            defaultValue={right}
            w="20"
            ml="auto"
            size="sm"
            min="0"
          >
            <NumberInputField pl="2" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <FormLabel mb="0" mr="1" fontSize="sm">
            Bottom
          </FormLabel>
          <NumberInput
            display="block"
            onChange={(value) => handleUpdateDebounce(2, value)}
            defaultValue={bottom}
            w="20"
            ml="auto"
            size="sm"
            min="0"
          >
            <NumberInputField pl="2" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <FormLabel mb="0" mr="1" fontSize="sm">
            Left
          </FormLabel>
          <NumberInput
            display="block"
            onChange={(value) => handleUpdateDebounce(3, value)}
            defaultValue={left}
            w="20"
            ml="auto"
            size="sm"
            min="0"
          >
            <NumberInputField pl="2" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </SimpleGrid>
    </Box>
  )
}

export default PaddingController
