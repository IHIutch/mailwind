import { Box } from '@chakra-ui/react'
import { javascript } from '@codemirror/lang-javascript'
import { okaidia } from '@uiw/codemirror-theme-okaidia'
import CodeMirror from '@uiw/react-codemirror'
import { useState } from 'react'

export default function CodeBlock({ details, onChange }) {
  const [innerHTML, setInnerHTML] = useState('')

  const handleChange = (value) => {
    onChange({
      ...details,
      value: value,
    })
  }

  return (
    <Box rounded="md" overflow="hidden">
      <CodeMirror
        value={details.value}
        theme={okaidia}
        extensions={[javascript({ jsx: true })]}
        onChange={(value, { view }) => {
          handleChange(value)
          setInnerHTML(view.contentDOM.innerHTML)
        }}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
        }}
        spellCheck="false"
      />
    </Box>
  )
}
