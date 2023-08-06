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
  { label: 'Dracula', value: 'dracula' },
  { label: 'Duotone Dark', value: 'duotoneDark' },
  { label: 'Duotone Light', value: 'duotoneLight' },
  { label: 'GitHub', value: 'github' },
  { label: 'Jettwave Dark', value: 'jettwaveDark' },
  { label: 'Jettwave Light', value: 'jettwaveLight' },
  { label: 'Night Owl', value: 'nightOwl' },
  { label: 'Night Owl Light', value: 'nightOwlLight' },
  { label: 'Oceanic Next', value: 'oceanicNext' },
  { label: 'Okaidia', value: 'okaidia' },
  { label: 'Palenight', value: 'palenight' },
  { label: 'Shades Of Purple', value: 'shadesOfPurple' },
  { label: 'Synthwave84', value: 'synthwave84' },
  { label: 'Ultramin', value: 'ultramin' },
  { label: 'VS Dark', value: 'vsDark' },
  { label: 'VS Light', value: 'vsLight' },
]

export default function CodeThemeSelect({
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
        defaultValue={value || 'dracula'}
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
