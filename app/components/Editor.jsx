import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { lowlight } from 'lowlight'

export default function Editor({ onChange, value, isCode = false }) {
  const editor = useEditor({
    editorProps: {
      handleDrop: () => true,
    },
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      // Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
      // PrismCodeBlock,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    onUpdate: (value) => {
      isCode
        ? onChange(value.editor?.getHTML())
        : onChange(value.editor?.getHTML().replaceAll(/<br.*?>/g, ''))
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
