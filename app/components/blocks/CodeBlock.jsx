import { toHtml } from 'hast-util-to-html'
import { lowlight } from 'lowlight'
import Editor from '../Editor'

export default function CodeBlock({ details, onChange }) {
  const replaceHtml = (value) => {
    return value.replace(/(<([^>]+)>)/gi, '')
  }

  const handleChange = (value) => {
    console.log({ value })
    onChange({
      ...details,
      value: replaceHtml(value),
    })
  }

  const code = toHtml(lowlight.highlightAuto(details.value))
  console.log({ code })

  return (
    <Editor
      value={`<pre><code>${details.value}</code></pre>`}
      onChange={handleChange}
    />
  )
}
