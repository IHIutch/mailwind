import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Editor({ onChange, value }) {
  const editor = useEditor({
    editorProps: {
      handleDrop: () => true,
    },
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        code: false,
        horizontalRule: false,
      }),
      // Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    onUpdate: (value) => {
      onChange(value.editor?.getHTML().replaceAll(/<br.*?>/g, ''))
    },
    content: value,
  })

  return (
    <EditorContent
      editor={editor}
      spellCheck={false}
      onKeyUp={(e) => {
        if (e.key === 'Enter') e.preventDefault()
      }}
    />
  )
}
