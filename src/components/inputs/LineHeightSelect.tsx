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

const lineHeightOptions = [
  { label: '1x', value: '1' },
  { label: '1.25x', value: '1.25' },
  { label: '1.375x', value: '1.375' },
  { label: '1.5x', value: '1.5' },
  { label: '1.625x', value: '1.625' },
  { label: '2x', value: '2' },
  { label: '12px', value: '12px' },
  { label: '16px', value: '16px' },
  { label: '20px', value: '20px' },
  { label: '24px', value: '24px' },
  { label: '28px', value: '28px' },
  { label: '32px', value: '32px' },
  { label: '36px', value: '36px' },
  { label: '40px', value: '40px' },
]

export default function LineHeightSelect({
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
    name: inputProps.name as 'blocks.0.attributes.lineHeight',
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
          {lineHeightOptions.map(({ label, value }, idx) => (
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
