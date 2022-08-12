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

const PaddingController = ({ value = '0 0 0 0', onChange }) => {
  const top = value.split(' ')[0] || '0'
  const right = value.split(' ')[1] || '0'
  const bottom = value.split(' ')[2] || '0'
  const left = value.split(' ')[3] || '0'

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

  return (
    <Box as="fieldset">
      <Heading as="legend" mb="2" fontSize="md" fontWeight="semibold">
        Padding
      </Heading>
      <SimpleGrid columns="2" rowGap="2" columnGap="4">
        <FormControl
          display="flex"
          alignItems="center"
          // justifyContent="flex-end"
        >
          <FormLabel mb="0" mr="1" fontSize="sm">
            Top
          </FormLabel>
          <NumberInput
            display="block"
            onChange={(value) => handleChange(0, value)}
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
            onChange={(value) => handleChange(1, value)}
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
            onChange={(value) => handleChange(2, value)}
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
            onChange={(value) => handleChange(3, value)}
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
