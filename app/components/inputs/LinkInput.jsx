import { useController } from 'react-hook-form'

export default function LinkInput({
  id,
  name,
  control,
  className,
  errorClassName,
}) {
  const {
    field: { onChange, name: inputName, value, ref },
    fieldState: { error },
  } = useController({
    name,
    defaultValue: '',
    control,
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
        aria-describedby={error || `${id}-error-message`}
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
