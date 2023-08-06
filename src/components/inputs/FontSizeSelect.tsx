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

const fontSizeOptions = [
  { label: 'X Small', value: '12px' },
  { label: 'Small', value: '14px' },
  { label: 'Base', value: '16px' },
  { label: 'Large', value: '18px' },
  { label: 'X Large', value: '20px' },
  { label: '2X Large', value: '24px' },
  { label: '3X Large', value: '30px' },
  { label: '4X Large', value: '36px' },
  { label: '5X Large', value: '48px' },
  { label: '6X Large', value: '60px' },
  { label: '7X Large', value: '72px' },
  { label: '8X Large', value: '96px' },
  { label: '9X Large', value: '128px' },
]

export default function FontSizeSelect({
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
    name: inputProps.name as 'blocks.0.attributes.fontSize',
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
          {fontSizeOptions.map(({ label, value }, idx) => (
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
