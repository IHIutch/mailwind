import { useController, type UseControllerProps } from 'react-hook-form'
import { type z } from 'zod'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import { cn } from '@/utils/functions'
import { type HeadingBlockSchema } from '@/utils/zod/schemas'
import { BlockType } from '@prisma/client'
import Editor from '../Editor'

type HeadingBlockAttributes = z.infer<typeof HeadingBlockSchema>

export default function HeadingBlock({
  type,
  attributes,
  inputProps,
}: {
  type: BlockType
  attributes: HeadingBlockAttributes['attributes']
  inputProps: UseControllerProps<DefaultFormValues>
  errorClassName?: string
}) {
  const {
    field: { onChange, onBlur, name: inputName, value, ref },
    fieldState: { error },
  } = useController({ ...inputProps })

  return (
    <div
      style={{
        paddingTop: attributes.paddingTop,
        paddingRight: attributes.paddingRight,
        paddingBottom: attributes.paddingBottom,
        paddingLeft: attributes.paddingLeft,
        fontSize: attributes.fontSize,
        fontWeight: attributes.fontWeight,
        lineHeight: attributes.lineHeight,
        color: attributes.color,
        backgroundColor: attributes.backgroundColor,
      }}
      className={cn(
        type === BlockType.H1
          ? 'text-4xl font-extrabold [&_strong]:font-black'
          : '',
        type === BlockType.H2
          ? 'text-2xl font-bold [&_strong]:font-extrabold'
          : '',
        type === BlockType.H3
          ? 'text-xl font-semibold [&_strong]:font-bold'
          : ''
      )}
    >
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
