import { SingleBlockPayloadType } from '@/utils/prisma/blocks'
import debounce from 'lodash/debounce'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import { useCallback, useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import Editor from 'react-simple-code-editor'

type FormValues = {
  blocks: SingleBlockPayloadType[]
  global: any
}

export default function CodeBlock({
  attributes,
  inputProps,
  className,
}: // errorClassName,
// errorClassName,
{
  attributes: any
  // value: string
  // onChange?: (value: any) => void
  // name: string
  // control: Control
  inputProps: UseControllerProps<FormValues>
  className?: string
  errorClassName?: string
}) {
  const {
    field: { onChange, onBlur, name: inputName, value, ref },
    fieldState: { error },
  } = useController({ ...inputProps })

  const [code, setCode] = useState(value)

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

  // const handleChange = (payload) => {
  //   setCode(payload)
  //   handleUpdateDebounce(payload)
  // }

  return (
    <div className="overflow-hidden rounded-md p-2" style={theme.plain}>
      <Editor
        ref={ref}
        name={inputName}
        value={value}
        // onChange={onChange}
        onBlur={onBlur}
        className="font-mono"
        onValueChange={onChange}
        highlight={(code) => <PrismaHighlight code={code} language="jsx" />}
      />
    </div>
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
