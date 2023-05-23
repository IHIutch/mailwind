import { useController, type UseControllerProps } from 'react-hook-form'
import { type z } from 'zod'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import { type TextBlockSchema } from '@/utils/zod/schemas'
import Editor from '../Editor'

type TextBlockAttributes = z.infer<typeof TextBlockSchema>

export default function TextBlock({
  attributes,
  inputProps,
  className,
}: {
  attributes: TextBlockAttributes['attributes']
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
