import ImageAddUrl from '../ImageAddUrl'
import { JSONValue } from 'superjson/dist/types'

export default function ImageBlock({
  attributes,
  value,
  onChange,
}: {
  attributes: JSONValue
  value: string
  onChange?: (value: any) => void
}) {
  return (
    <div>
      <ImageAddUrl value={value} onChange={onChange} />
    </div>
  )
}
