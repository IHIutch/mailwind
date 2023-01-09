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

const PaddingController = ({ value = ['0', '0', '0', '0'], onChange }) => {
  const top = value?.[0] ?? '0'
  const right = value?.[1] ?? '0'
  const bottom = value?.[2] ?? '0'
  const left = value?.[3] ?? '0'

  const handleChange = (idx, payload) => {
    const newValue = [...value]
    newValue[idx] = payload === '0' ? payload : payload + 'px'
    onChange(newValue)
  }

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
            onBlur={(e) => handleChange(0, e.target.value)}
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
            onBlur={(e) => handleChange(1, e.target.value)}
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
            onBlur={(e) => handleChange(2, e.target.value)}
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
            onBlur={(e) => handleChange(3, e.target.value)}
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
