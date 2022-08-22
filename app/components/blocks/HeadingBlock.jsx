import React from 'react'
import { Box } from '@chakra-ui/react'
import { BlockType } from 'utils/types'
import Editor from '../Editor'

export default function HeadingBlock({ type, details, onChange }) {
  const handleChange = (value) => {
    onChange({
      ...details,
      value,
    })
  }

  const headingConfig = {
    [BlockType.H1]: {
      // placeholder: 'Heading 1',
      fontSize: '4xl',
      // fontWeight: 'semibold',
    },
    [BlockType.H2]: {
      // placeholder: 'Heading 2',
      fontSize: '3xl',
      // fontWeight: 'medium',
    },
    [BlockType.H3]: {
      // placeholder: 'Heading 3',
      fontSize: '2xl',
      // fontWeight: 'medium',
    },
  }
  return (
    <Box {...headingConfig[type]}>
      <Editor value={details.value} onChange={handleChange} />
    </Box>
  )
}
