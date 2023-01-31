import Editor from '../Editor'
import { JSONValue } from 'superjson/dist/types'

export default function QuoteBlock({
  attributes,
  value,
  onChange,
}: {
  attributes: JSONValue
  value: string
  onChange?: (value: any) => void
}) {
  return (
    <div className="border-l-4 border-gray-200 pl-3">
      <Editor value={value} onChange={onChange} />
    </div>
  )
}
