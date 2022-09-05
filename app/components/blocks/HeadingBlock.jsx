import { Box } from '@chakra-ui/react'
import { BlockType } from '~/utils/types'
import Editor from '../Editor'

export default function HeadingBlock({ type, value, onChange }) {
  const headingConfig = {
    [BlockType.H1]: {
      // fontSize: em(30, 14),
      // marginTop: '0',
      // marginBottom: em(24, 30),
      // lineHeight: round(36 / 30),
      fontSize: '36px',
      lineHeight: '40px',
      fontWeight: 800,
      sx: {
        '& strong': {
          fontWeight: 900,
        },
      },
    },
    [BlockType.H2]: {
      // fontSize: em(20, 14),
      // marginTop: em(32, 20),
      // marginBottom: em(16, 20),
      // lineHeight: round(28 / 20),
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 700,
      sx: {
        '& strong': {
          fontWeight: 800,
        },
      },
    },
    [BlockType.H3]: {
      // fontSize: em(18, 14),
      // marginTop: em(28, 18),
      // marginBottom: em(8, 18),
      // lineHeight: round(28 / 18),
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 600,
      sx: {
        '& strong': {
          fontWeight: 700,
        },
      },
    },
  }
  return (
    <Box {...headingConfig[type]}>
      <Editor value={value} onChange={onChange} />
    </Box>
  )
}
