import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getHighlighter } from 'shiki'
import CodeblockEditor from '../CodeblockEditor'

export default function CodeBlock({ details, onChange }) {
  const [highlighter, setHighlighter] = useState(null)

  const replaceHtml = (value) => {
    return value.replace(/(<([^>]+)>)/gi, '')
  }

  const handleChange = (value) => {
    onChange({
      ...details,
      value: replaceHtml(value),
    })
  }

  useEffect(() => {
    const handleGetHighlighter = async (theme) => {
      const hl = await getHighlighter({ theme: 'nord' })
      return setHighlighter(hl)
    }
    handleGetHighlighter()
  }, [])

  return (
    <Box>
      {highlighter ? (
        <CodeblockEditor
          value={`<pre><code>${details.value}</code></pre>`}
          onChange={handleChange}
          highlighter={highlighter}
        />
      ) : null}
    </Box>
  )
}
