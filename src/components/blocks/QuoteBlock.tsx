import Editor from '../Editor'
import { useController, UseControllerProps } from 'react-hook-form'
import { SingleBlockPayloadType } from '@/utils/prisma/blocks'

type FormValues = {
  blocks: SingleBlockPayloadType[]
  global: any
}

export default function QuoteBlock({
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
    <div className="border-l-4 border-gray-200 pl-3">
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
