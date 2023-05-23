import { useController, type UseControllerProps } from 'react-hook-form'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import { Input } from '../ui/Input'

export default function SpacingInput({
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
    field: { onChange, onBlur, name: inputName, value, ref },
    fieldState: { error },
  } = useController({
    ...inputProps,
    rules: {
      required: 'This field is required',
      validate: {
        isNumber: (v) => {
          const { value } = handleMatch(v)
          if (isNaN(value)) return `Value must be a number`
        },
        isPositive: (v) => {
          const { value } = handleMatch(v)
          if (parseInt(value) < 0) return `Value cannot be negative`
        },
        isUnitSupported: (v) => {
          const { unit } = handleMatch(v)
          if (!['px', '%'].includes(unit)) return `Units must be 'px' or '%'`
        },
        isFormatted: (v) => {
          const { value, unit } = handleMatch(v)
          if (value + unit !== v) return 'Value formatted incorrectly'
        },
      },
    },
  })

  const handleShiftSpinner = (e, callback) => {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault()

      const { value, unit } = handleMatch(e.target.value)

      const currentValue = isNaN(value) ? 0 : parseInt(value)

      const dir = e.key === 'ArrowUp' ? 1 : -1
      const modifier = e.shiftKey ? 10 : 1

      callback(currentValue + dir * modifier + unit)
    }
  }

  const handleMatch = (val) => {
    const groups = val?.match(/(?<value>^-?\d+)(?<unit>\S+|)/)?.groups

    const value = groups?.value || ''
    const unit = groups?.unit || ''

    return { value, unit }
  }

  return (
    <div>
      <Input
        id={id}
        type="text"
        className={className}
        onKeyDown={(e) => {
          handleShiftSpinner(e, (value) => {
            onChange(value.replace(/\s/g, '').trim())
          })
        }}
        onChange={(e) => onChange(e.target.value.replace(/\s/g, '').trim())} // send value to hook form
        onBlur={onBlur}
        value={value}
        name={inputName}
        ref={ref}
        aria-describedby={error ? `${id}-error-message` : ''}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error ? (
        <p id={`${id}-error-message`} className={errorClassName}>
          {error?.message}
        </p>
      ) : null}
    </div>
  )
}
