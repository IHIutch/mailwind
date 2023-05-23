import { useController, type UseControllerProps } from 'react-hook-form'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import ImageAddUrl from '../ImageAddUrl'

export default function ImageBlock({
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
    <div>
      <ImageAddUrl name={inputName} value={value} onChange={onChange} />
    </div>
  )
}
