import Editor from '../Editor'

export default function QuoteBlock({ value, onChange }) {
  return (
    <div className="border-l-4 border-gray-200 pl-3">
      <Editor value={value} onChange={onChange} />
    </div>
  )
}
