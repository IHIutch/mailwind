import { DefaultFormValues } from '@/pages/templates/[id]'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import { useEffect, useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import Editor from 'react-simple-code-editor'
import { z } from 'zod'

// const codeAttributes = z
//   .object({
//     value: z.string(),
//     attributes: z.object({
//       language: z.string(),
//       theme: z.string(),
//     }),
//   })
//   .optional()

export default function CodeBlock({
  attributes,
  inputProps,
  className,
  errorClassName,
}: {
  attributes: any
  inputProps: UseControllerProps<DefaultFormValues>
  className?: string
  errorClassName?: string
}) {
  const {
    field: { onChange, onBlur, name: inputName, value, ref },
    fieldState: { error },
  } = useController({ ...inputProps })

  const [code, setCode] = useState((value || '').toString())

  useEffect(() => {
    onChange(code)
  }, [code, onChange])

  // const handleDetectLanguage = useCallback(() => {
  //   const result = hljs.highlightAuto(code)
  //   setLanguage(result.language)
  // }, [code])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const handleDetectLanguageDebounce = useCallback(
  //   debounce(handleDetectLanguage, 250),
  //   [handleDetectLanguage]
  // )

  return (
    <div className="overflow-hidden rounded-md p-2" style={theme.plain}>
      <Editor
        ref={ref}
        name={inputName}
        value={code}
        onBlur={onBlur}
        className="font-mono"
        onValueChange={(code) => setCode(code)}
        highlight={(code) => <PrismaHighlight code={code} language="jsx" />}
      />
    </div>
  )
}

const PrismaHighlight = ({
  code,
  language,
}: {
  code: string
  language: Language
}) => {
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
