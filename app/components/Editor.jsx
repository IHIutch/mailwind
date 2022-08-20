import { Box, Button, ButtonGroup, Flex, Stack } from '@chakra-ui/react'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useCallback } from 'react'

export default function Editor({ onChange, value }) {
  const editor = useEditor({
    editorProps: {
      handleDrop: true,
      attributes: {
        style: 'height: 100%;padding:1rem;',
      },
    },
    extensions: [
      StarterKit,
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
    <Flex h="100%" direction="column">
      {/* <Box borderWidth="1px" flexGrow="1"> */}
      <EditorContent
        style={{ height: '100%' }}
        editor={editor}
        spellCheck={false}
        onKeyUp={(e) => {
          if (e.key === 'Enter') e.preventDefault()
        }}
      />
      {/* </Box> */}
    </Flex>
  )
}

const MenuBar = ({ editor }) => {
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const addLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // function to automatically add protocol if missing
    const addProtocol = (url) => {
      if (!/^(?:f|ht)tps?:\/\//.test(url)) {
        url = 'http://' + url
      }
      return url
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: addProtocol(url) })
      .run()
  }, [editor])

  return (
    <Box>
      <Stack direction="row">
        <ButtonGroup size="sm" isAttached>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            colorScheme={
              editor.isActive('heading', { level: 1 }) ? 'blue' : 'gray'
            }
          >
            h1
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            colorScheme={
              editor.isActive('heading', { level: 2 }) ? 'blue' : 'gray'
            }
          >
            h2
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            colorScheme={
              editor.isActive('heading', { level: 3 }) ? 'blue' : 'gray'
            }
          >
            h3
          </Button>
          <Button
            onClick={() => editor.chain().focus().setParagraph().run()}
            colorScheme={editor.isActive('paragraph') ? 'blue' : 'gray'}
          >
            paragraph
          </Button>
        </ButtonGroup>
        <ButtonGroup size="sm" isAttached>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            colorScheme={editor.isActive('bold') ? 'blue' : 'gray'}
          >
            bold
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            colorScheme={editor.isActive('italic') ? 'blue' : 'gray'}
          >
            italic
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            colorScheme={editor.isActive('strike') ? 'blue' : 'gray'}
          >
            strike
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            colorScheme={editor.isActive('highlight') ? 'blue' : 'gray'}
          >
            highlight
          </Button>
        </ButtonGroup>
        <ButtonGroup size="sm" isAttached>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            colorScheme={
              editor.isActive({ textAlign: 'left' }) ? 'blue' : 'gray'
            }
          >
            left
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            colorScheme={
              editor.isActive({ textAlign: 'center' }) ? 'blue' : 'gray'
            }
          >
            center
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            colorScheme={
              editor.isActive({ textAlign: 'right' }) ? 'blue' : 'gray'
            }
          >
            right
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            colorScheme={
              editor.isActive({ textAlign: 'justify' }) ? 'blue' : 'gray'
            }
          >
            justify
          </Button>
        </ButtonGroup>
        <ButtonGroup size="sm" isAttached>
          <Button onClick={addImage}>image</Button>
          <Button onClick={addLink}>link</Button>
        </ButtonGroup>
      </Stack>
    </Box>
  )
}
