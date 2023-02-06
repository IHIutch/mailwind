import Editor from '../Editor'
import { BlockType } from '@prisma/client'
import clsx from 'clsx'
import { useController, UseControllerProps } from 'react-hook-form'
import { SingleBlockPayloadType } from '@/utils/prisma/blocks'

type FormValues = {
  blocks: SingleBlockPayloadType[]
  global: any
}

export default function HeadingBlock({
  type,
  attributes,
  inputProps,
  className,
}: // errorClassName,
// errorClassName,
{
  type: BlockType
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
    <div
      className={clsx(
        type === BlockType.H1 &&
          'text-4xl font-extrabold [&_strong]:font-black',
        type === BlockType.H2 && 'text-2xl font-bold [&_strong]:font-extrabold',
        type === BlockType.H3 && 'text-xl font-semibold [&_strong]:font-bold'
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
