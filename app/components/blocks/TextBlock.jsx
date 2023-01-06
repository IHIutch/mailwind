import Editor from '../Editor'

export default function TextBlock({ attributes, value, onChange }) {
  return (
    <div style={{ ...attributes }}>
      <Editor value={value} onChange={onChange} />
    </div>
  )
}
