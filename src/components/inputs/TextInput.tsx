import { useController, type UseControllerProps } from 'react-hook-form'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import { Input } from '../ui/Input'

export default function TextInput({
  id,
  type = 'text',
  inputProps,
  className,
  errorClassName,
}: {
  id: string
  type?: HTMLInputElement['type']
  inputProps: UseControllerProps<DefaultFormValues>
  className?: string
  errorClassName?: string
}) {
  const {
    field: { onChange, name: inputName, value, ref },
    fieldState: { error },
  } = useController({
    ...inputProps,
  })

  return (
    <div>
      <Input
        id={id}
        type={type}
        className={className}
        onChange={(e) => onChange(e.target.value)}
        defaultValue={value}
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
