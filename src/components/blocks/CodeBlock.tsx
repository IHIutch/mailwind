import { useEffect, useState } from 'react'
import { Highlight, type Language, themes } from 'prism-react-renderer'
import { useController, type UseControllerProps } from 'react-hook-form'
import Editor from 'react-simple-code-editor'
import { type CodeBlockAttributeProps } from 'types/block.types'

import { type DefaultFormValues } from '@/pages/templates/[id]'

export default function CodeBlock({
  attributes,
  inputProps,
  className,
  errorClassName,
}: {
  attributes: CodeBlockAttributeProps
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
    <div
      className="overflow-hidden p-2"
      style={themes[attributes.theme || 'dracula'].plain}
    >
      <Editor
        ref={ref}
        name={inputName}
        value={code}
        onBlur={onBlur}
        className="font-mono"
        textareaClassName="focus:outline-none"
        onValueChange={(code) => setCode(code)}
        highlight={(code) => (
          <PrismaHighlight
            code={code}
            theme={attributes.theme}
            language={attributes.language || 'jsx'}
          />
        )}
      />
    </div>
  )
}

const PrismaHighlight = ({
  code,
  language,
  theme,
}: {
  code: string
  language: Language
  theme: CodeBlockAttributeProps['theme']
}) => {
  return (
    <Highlight
      theme={themes[theme || 'dracula']}
      code={code}
      language={language}
    >
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
