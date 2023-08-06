import React from 'react'
import { useController, type UseControllerProps } from 'react-hook-form'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'

const options = [
  { label: 'JSX', value: 'jsx' },
  { label: 'TSX', value: 'tsx' },
  { label: 'Swift', value: 'swift' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'Objective C', value: 'objectivec' },
  { label: 'JS Extras', value: 'js-extras' },
  { label: 'Reason', value: 'reason' },
  { label: 'Rust', value: 'rust' },
  { label: 'GraphQL', value: 'graphql' },
  { label: 'YAML', value: 'yaml' },
  { label: 'Go', value: 'go' },
  { label: 'CPP', value: 'cpp' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'HTML', value: 'html' },
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
    name: inputProps.name as 'blocks.0.attributes.language',
    control: inputProps.control,
    rules: {
      required: 'This field is required',
    },
  })

  return (
    <div className={className}>
      <Select
        defaultValue={value}
        name={inputName}
        onValueChange={onChange}
        aria-describedby={error ? `${id}-error-message` : ''}
        aria-invalid={error ? 'true' : 'false'}
      >
        <SelectTrigger ref={ref}>
          <SelectValue placeholder="Select a value..." />
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
