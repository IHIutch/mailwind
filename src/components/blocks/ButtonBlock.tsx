import ContentEditable from 'react-contenteditable'
import { useController, type UseControllerProps } from 'react-hook-form'
import { type ButtonBlockProps } from 'types/block.types'

import { type DefaultFormValues } from '@/pages/templates/[id]'

export default function ButtonBlock({
  attributes,
  inputProps,
  className,
}: {
  attributes: ButtonBlockProps['attributes']
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
        style={{
          ...attributes,
          paddingTop: attributes.innerPaddingTop,
          paddingRight: attributes.innerPaddingRight,
          paddingBottom: attributes.innerPaddingBottom,
          paddingLeft: attributes.innerPaddingLeft,
        }}
        className="inline-block"
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
