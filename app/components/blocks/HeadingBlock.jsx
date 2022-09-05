import { Box } from '@chakra-ui/react'
import { BlockType } from '~/utils/types'
import Editor from '../Editor'

export default function HeadingBlock({ type, value, onChange }) {
  const round = (num) =>
    num
      .toFixed(7)
      .replace(/(\.[0-9]+?)0+$/, '$1')
      .replace(/\.0$/, '')
  const em = (px, base) => `${round(px / base)}em`

  const headingConfig = {
    [BlockType.H1]: {
      // fontSize: em(30, 14),
      fontSize: '36px',
      // marginTop: '0',
      // marginBottom: em(24, 30),
      // lineHeight: round(36 / 30),
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
      fontSize: '24px',
      // marginTop: em(32, 20),
      // marginBottom: em(16, 20),
      // lineHeight: round(28 / 20),
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
      fontSize: '20px',
      // marginTop: em(28, 18),
      // marginBottom: em(8, 18),
      // lineHeight: round(28 / 18),
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
