import { Box } from '@chakra-ui/react'
import { highlight, languages } from 'prismjs'
import Editor from 'react-simple-code-editor'
import hljs from 'highlight.js'

import { useCallback, useState } from 'react'
import debounce from 'lodash/debounce'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

export default function CodeBlock({ value, onChange = () => null }) {
  const [code, setCode] = useState(value)
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

  const handleChange = (payload) => {
    setCode(payload)
    handleUpdateDebounce(payload)
  }

  const handleHighlight = () => {
    // if (code) handleDetectLanguageDebounce(code)
    return highlight(code, languages[language], language)
  }

  return (
    <Box
      className="prose"
      rounded="md"
      overflow="hidden"
      p="2"
      style={theme.plain}
    >
      <Editor
        value={code}
        onValueChange={handleChange}
        highlight={(code) => <PrismaHighlight code={code} language="jsx" />}
      />
    </Box>
  )
}

const PrismaHighlight = ({ code, language }) => {
  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </>
      )}
    </Highlight>
  )
}
