import { useController, type UseControllerProps } from 'react-hook-form'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import Editor from '../Editor'

export default function QuoteBlock({
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
