import { type DefaultFormValues } from '@/pages/templates/[id]'
import { useController, type UseControllerProps } from 'react-hook-form'
import Editor from '../Editor'

export default function TextBlock({
  attributes,
  inputProps,
  className,
  errorClassName,
}: {
  attributes: any
  inputProps: UseControllerProps<DefaultFormValues>
  className?: string
  errorClassName?: string
}) {
  const {
    field: { onChange, onBlur, name: inputName, value, ref },
    fieldState: { error },
  } = useController({ ...inputProps })

  return (
    <div style={{ ...attributes }} className={className}>
      <Editor
        ref={ref}
        name={inputName}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}
