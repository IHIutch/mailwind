import { useController, type UseControllerProps } from 'react-hook-form'
import { match } from 'ts-pattern'
import { type HeadingBlockProps } from 'types/block.types'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import { cn } from '@/utils/functions'
import { BlockType } from '@prisma/client'
import Editor from '../Editor'

export default function HeadingBlock({
  type,
  attributes,
  inputProps,
}: {
  type: Exclude<BlockType, 'CODE' | 'TEXT' | 'DIVIDER' | 'IMAGE' | 'BUTTON'>
  attributes: HeadingBlockProps['attributes']
  inputProps: UseControllerProps<DefaultFormValues>
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
        paddingTop: attributes.paddingTop,
        paddingRight: attributes.paddingRight,
        paddingBottom: attributes.paddingBottom,
        paddingLeft: attributes.paddingLeft,
        fontSize: attributes.fontSize,
        fontWeight: attributes.fontWeight,
        lineHeight: attributes.lineHeight,
        color: attributes.color,
        backgroundColor: attributes.containerBackgroundColor,
      }}
      className={cn(
        match(type)
          .with(
            BlockType.H1,
            () => 'text-4xl font-extrabold [&_strong]:font-black'
          )
          .with(
            BlockType.H2,
            () => 'text-2xl font-bold [&_strong]:font-extrabold'
          )
          .with(
            BlockType.H3,
            () => 'text-xl font-semibold [&_strong]:font-bold'
          )
          .exhaustive()
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
