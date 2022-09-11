import ImageAddUrl from '../ImageAddUrl'

export default function ImageBlock({ value, onChange }) {
  return (
    <div>
      <ImageAddUrl value={value} onChange={onChange} />
    </div>
  )
}
