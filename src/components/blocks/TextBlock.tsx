import Editor from '../Editor'
import { JSONValue } from 'superjson/dist/types'

export default function TextBlock({
  attributes,
  value,
  onChange,
}: {
  attributes: JSONValue
  value: string
  onChange?: (value: any) => void
}) {
  return (
    <div style={typeof attributes === 'object' ? { ...attributes } : undefined}>
      <Editor value={value} onChange={onChange} />
    </div>
  )
}
