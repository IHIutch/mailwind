import clsx from 'clsx'
import { BlockType } from '~/utils/types'
import Editor from '../Editor'

export default function HeadingBlock({ type, value, onChange }) {
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
