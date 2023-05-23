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
  { label: '0px', value: '0px' },
  { label: '1px', value: '1px' },
  { label: '2px', value: '2px' },
  { label: '4px', value: '4px' },
  { label: '6px', value: '6px' },
  { label: '8px', value: '8px' },
  { label: '10px', value: '10px' },
  { label: '12px', value: '12px' },
  { label: '14px', value: '14px' },
  { label: '16px', value: '16px' },
  { label: '20px', value: '20px' },
  { label: '24px', value: '24px' },
  { label: '32px', value: '32px' },
  { label: '40px', value: '40px' },
  { label: '44px', value: '44px' },
  { label: '48px', value: '48px' },
  { label: '56px', value: '56px' },
  { label: '64px', value: '64px' },
  { label: '80px', value: '80px' },
  { label: '96px', value: '96px' },
]

export default function PaddingSelect({
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
      required: true,
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
          <SelectValue placeholder="Font Size" />
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
