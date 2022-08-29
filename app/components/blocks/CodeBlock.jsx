import { Box } from '@chakra-ui/react'
import prismjs from 'prismjs'
import Editor from 'react-simple-code-editor'
import hljs from 'highlight.js'

// import 'prismjs/components/prism-clike'
// import 'prismjs/components/prism-javascript'
// import 'prismjs/components/prism-css'

import { useCallback, useState } from 'react'
import debounce from 'lodash/debounce'

export default function CodeBlock({ details, onChange = () => null }) {
  const [code, setCode] = useState(details.value)
  const [language, setLanguage] = useState('javascript')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateDebounce = useCallback(debounce(onChange, 250), [onChange])

  // const handleDetectLanguage = useCallback(() => {
  //   const result = hljs.highlightAuto(code)
  //   setLanguage(result.language)
  // }, [code])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const handleDetectLanguageDebounce = useCallback(
  //   debounce(handleDetectLanguage, 250),
  //   [handleDetectLanguage]
  // )

  const handleChange = (value) => {
    setCode(value)
    handleUpdateDebounce({
      ...details,
      value: value,
    })
  }

  const handleHighlight = () => {
    // if (code) handleDetectLanguageDebounce(code)
    return prismjs.highlight(code, prismjs.languages[language], language)
  }

  return (
    <Box bg="gray.50" rounded="md" overflow="hidden" p="1">
      <Editor
        value={code}
        onValueChange={handleChange}
        highlight={(code) => handleHighlight(code)}
      />
    </Box>
  )
}
