import { useController, type UseControllerProps } from 'react-hook-form'
import { type TextBlockProps } from 'types/block.types'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import Editor from '../Editor'

export default function TextBlock({
  attributes,
  inputProps,
  className,
}: {
  attributes: TextBlockProps['attributes']
  inputProps: UseControllerProps<DefaultFormValues>
  className?: string
  errorClassName?: string
}) {
  const {
    field: { onChange, onBlur, name: inputName, value, ref },
    fieldState: { error },
  } = useController({
    name: inputProps.name as 'blocks.0.value',
    control: inputProps.control,
  })

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
