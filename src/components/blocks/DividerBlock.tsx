import { JSONValue } from 'superjson/dist/types'

export default function DividerBlock({
  attributes,
  value,
  onChange = () => null,
}: {
  attributes: JSONValue
  value: string
  onChange?: (value: any) => void
}) {
  return (
    <div className="py-3">
      <div className="border-t border-gray-200" />
    </div>
  )
}
