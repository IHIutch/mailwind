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
  { label: '0px', value: '0' },
  { label: '1px', value: '1px' },
  { label: '2px', value: '2px' },
  { label: '8px', value: '8px' },
]

export default function BorderWidthSelect({
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
    name: inputProps.name as 'blocks.0.attributes.borderWidth',
    control: inputProps.control,
    rules: {
      required: 'This field is required',
    },
  })

  return (
    <div className={cn(className)}>
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
