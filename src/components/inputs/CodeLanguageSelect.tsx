import React from 'react'
import { useController, type UseControllerProps } from 'react-hook-form'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import { cn } from '@/utils/functions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'

const options = [
  { label: 'Markup', value: 'markup' },
  { label: 'Bash', value: 'bash' },
  { label: 'clike', value: 'clike' },
  { label: 'C', value: 'c' },
  { label: 'CPP', value: 'cpp' },
  { label: 'CSS', value: 'css' },
  { label: 'Javascript', value: 'javascript' },
  { label: 'JSX', value: 'jsx' },
  { label: 'CoffeeScript', value: 'coffeescript' },
  { label: 'ActionScript', value: 'actionscript' },
  { label: 'CSS-extr', value: 'css-extr' },
  { label: 'Diff', value: 'diff' },
  { label: 'Git', value: 'git' },
  { label: 'Go', value: 'go' },
  { label: 'GraphQL', value: 'graphql' },
  { label: 'Handlebars', value: 'handlebars' },
  { label: 'JSON', value: 'json' },
  { label: 'LESS', value: 'less' },
  { label: 'Makefile', value: 'makefile' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'Objective C', value: 'objectivec' },
  { label: 'OCaml', value: 'ocaml' },
  { label: 'Python', value: 'python' },
  { label: 'Reason', value: 'reason' },
  { label: 'SASS', value: 'sass' },
  { label: 'SCSS', value: 'scss' },
  { label: 'SQL', value: 'sql' },
  { label: 'Stylus', value: 'stylus' },
  { label: 'TSX', value: 'tsx' },
  { label: 'Typescript', value: 'typescript' },
  { label: 'WASM', value: 'wasm' },
  { label: 'YAML', value: 'yaml' },
]

export default function CodeLanguageSelect({
  id,
  inputProps,
  className,
  errorClassName,
}: {
  id: string
  inputProps: UseControllerProps<DefaultFormValues>
  className?: string
  errorClassName?: string
}) {
  const {
    field: { onChange, name: inputName, value, ref },
    fieldState: { error },
  } = useController({
    ...inputProps,
    rules: {
      required: 'This field is required',
    },
  })

  return (
    <div className={cn(className)}>
      <Select
        defaultValue={value}
        ref={ref}
        name={inputName}
        onValueChange={onChange}
        aria-describedby={error ? `${id}-error-message` : ''}
        aria-invalid={error ? 'true' : 'false'}
      >
        <SelectTrigger>
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value }, idx) => (
            <SelectItem key={idx} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <p id={`${id}-error-message`} className={errorClassName}>
          {error?.message}
        </p>
      ) : null}
    </div>
  )
}
