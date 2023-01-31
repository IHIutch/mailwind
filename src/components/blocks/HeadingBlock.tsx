import Editor from '../Editor'
import { BlockType } from '@prisma/client'
import clsx from 'clsx'
import { JSONValue } from 'superjson/dist/types'

export default function HeadingBlock({
  type,
  attributes,
  value,
  onChange = () => null,
}: {
  type: BlockType
  attributes: JSONValue
  value: string
  onChange?: (value: any) => void
}) {
  return (
    <div
      className={clsx(
        type === BlockType.H1 &&
          'text-4xl font-extrabold [&_strong]:font-black',
        type === BlockType.H2 && 'text-2xl font-bold [&_strong]:font-extrabold',
        type === BlockType.H3 && 'text-xl font-semibold [&_strong]:font-bold'
      )}
    >
      <Editor value={value} onChange={onChange} />
    </div>
  )
}
