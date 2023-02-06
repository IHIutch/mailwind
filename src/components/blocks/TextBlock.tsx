import { SingleBlockPayloadType } from '@/utils/prisma/blocks'
import { useController, UseControllerProps } from 'react-hook-form'
import Editor from '../Editor'

type FormValues = {
  blocks: SingleBlockPayloadType[]
  global: any
}

export default function TextBlock({
  attributes,
  inputProps,
  className,
}: // errorClassName,
// errorClassName,
{
  attributes: any
  // value: string
  // onChange?: (value: any) => void
  // name: string
  // control: Control
  inputProps: UseControllerProps<FormValues>
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
