import {
  Box,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
} from '@chakra-ui/react'
import debounce from 'lodash/debounce'
import { useCallback } from 'react'

const BorderController = ({ value = '0 0 0 0', onChange }) => {
  console.log({ value })

  const top = value.split(' ')[0]
  const right = value.split(' ')[1]
  const bottom = value.split(' ')[2]
  const left = value.split(' ')[3]

  const handleBorderChange = (value) => {
    return value == '0' ? '0' : value + 'px'
  }

  const handleChange = (idx, payload) => {
    const newValue = value.split(' ')
    newValue[idx] = handleBorderChange(payload)

    if (newValue.every((v) => v == '0')) {
      onChange('none')
    } else {
      onChange(newValue.join(' '))
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeDebounce = useCallback(debounce(handleChange, 250), [
    handleChange,
  ])

  return (
    <Box>
      <SimpleGrid columns="2" spacing="2">
        <FormControl>
          <FormLabel>Border Top</FormLabel>
          <NumberInput
            onChange={(value) => handleChangeDebounce(0, value)}
            defaultValue={top}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Border Right</FormLabel>
          <NumberInput
            onChange={(value) => handleChangeDebounce(1, value)}
            defaultValue={right}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Border Bottom</FormLabel>
          <NumberInput
            onChange={(value) => handleChangeDebounce(2, value)}
            defaultValue={bottom}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Border Left</FormLabel>
          <NumberInput
            onChange={(value) => handleChangeDebounce(3, value)}
            defaultValue={left}
          >
            <NumberInputField />
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

export default BorderController
