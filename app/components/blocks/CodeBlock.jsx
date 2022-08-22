import Editor from '../Editor'

export default function CodeBlock({ details, onChange }) {
  const replaceHtml = (value) => {
    return value.replace(/(<([^>]+)>)/gi, '')
  }

  const handleChange = (value) => {
    onChange({
      ...details,
      value: replaceHtml(value),
    })
  }

  return (
    <Editor
      value={`<pre><code>${details.value}</code></pre>`}
      onChange={handleChange}
    />
  )
}
