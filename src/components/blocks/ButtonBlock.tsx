import ContentEditable from 'react-contenteditable'
import { useController, type UseControllerProps } from 'react-hook-form'
import { type z } from 'zod'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import { type ButtonBlockSchema } from '@/utils/zod/schemas'

type ButtonBlockAttributes = z.infer<typeof ButtonBlockSchema>['attributes']

export default function ButtonBlock({
  attributes,
  inputProps,
  className,
}: {
  attributes: ButtonBlockAttributes
  inputProps: UseControllerProps<DefaultFormValues>
  className?: string
  errorClassName?: string
}) {
  const {
    field: { onChange, onBlur, name: inputName, value, ref },
    fieldState: { error },
  } = useController({ ...inputProps })

  return (
    <div
      style={{
        backgroundColor: attributes.containerBackgroundColor,
        paddingTop: attributes.paddingTop,
        paddingRight: attributes.paddingRight,
        paddingBottom: attributes.paddingBottom,
        paddingLeft: attributes.paddingLeft,
      }}
      className="text-center"
    >
      <div
        className="inline-block"
        style={{
          ...attributes,
          paddingTop: attributes.innerPaddingTop,
          paddingRight: attributes.innerPaddingRight,
          paddingBottom: attributes.innerPaddingBottom,
          paddingLeft: attributes.innerPaddingLeft,
          display: 'inline-block',
        }}
      >
        <ContentEditable
          className="min-w-[4px] bg-transparent"
          onChange={(e) => onChange(e.target.value)} // send value to hook form
          html={value}
        />
      </div>
    </div>
  )
}
