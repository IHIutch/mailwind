import { DefaultFormValues } from '@/pages/templates/[id]'
import { useController, UseControllerProps } from 'react-hook-form'

export default function LinkInput({
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
    <div>
      <input
        id={id}
        type="url"
        className={className}
        onChange={(e) => onChange(e.target.value)}
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
