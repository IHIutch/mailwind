import { Box, Button, ButtonGroup, SimpleGrid, Stack } from '@chakra-ui/react'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useMemo } from 'react'
import { useCallback } from 'react'
import { ClientOnly } from 'remix-utils'
import { getComponentAttributes } from 'utils/functions'
import getHtml from '~/models/getHtml.client'

export default function Tiptap() {
  const [json, setJson] = React.useState(null)
  return (
    <SimpleGrid spacing="0" columns="2" h="100vh">
      <Box borderWidth="1px" h="100%">
        <TipTapEditor onChange={setJson} />
      </Box>
      <Box>
        <ClientOnly>{() => <MjmlPreview json={json} />}</ClientOnly>
      </Box>
    </SimpleGrid>
  )
}

const MjmlPreview = ({ json }) => {
  const handleFormatText = (arr, isFormatting = true) => {
    return arr
      .map((a) => {
        const types = isFormatting && a?.marks ? a.marks.map((m) => m.type) : []
        return `<span
            style="
            ${types.includes('bold') ? 'font-weight:bold;' : ''}
            ${types.includes('italic') ? 'font-style:italic;' : ''}
            ${types.includes('strike') ? 'text-decoration:line-through;' : ''}
            "
          >
            ${a.text}
          </span>`
      })
      .join('')
  }

  const handleGetAttrs = (tagName) => {
    return Object.entries(getComponentAttributes(tagName)).reduce(
      (acc, [key, val]) =>
        key === 'content' ? acc : { ...acc, [key]: val.defaultValue },
      {}
    )
  }

  const handleGetContent = useCallback((arr) => {
    return arr.map((a) => {
      switch (a.type) {
        case 'paragraph':
          return a?.content
            ? {
                'css-class': 'paragraph',
                tagName: 'mj-text',
                attributes: {
                  ...handleGetAttrs('mj-text'),
                  ...(a?.attrs.textAlign ? { align: a?.attrs.textAlign } : {}),
                },
                content: handleFormatText(a.content),
              }
            : {
                tagName: 'mj-spacer',
                attributes: {},
              }

        case 'heading':
          return {
            'css-class': 'heading',
            tagName: 'mj-text',
            attributes: {
              ...handleGetAttrs('mj-text'),
              ...(a?.attrs.textAlign ? { align: a?.attrs.textAlign } : {}),
              ...(a?.attrs.level
                ? {
                    'font-size': ['16px', '24px', '20px', '16px'][
                      a?.attrs.level
                    ],
                    'font-weight': 'bold',
                  }
                : {}),
            },
            content: a?.content ? handleFormatText(a.content, false) : '',
          }

        case 'text':
          return {
            'css-class': 'mj-text',
            tagName: 'mj-text',
            content: a.text,
          }

        case 'content':
          return handleGetContent(a.content)

        default:
          return {}
      }
    })
  }, [])

  console.log({ json })

  const html = useMemo(
    () =>
      getHtml({
        tagName: 'mjml',
        attributes: {},
        children: [
          {
            tagName: 'mj-head',
            children: [],
          },
          {
            tagName: 'mj-body',
            attributes: {},
            children: [
              {
                tagName: 'mj-wrapper',
                attributes: {},
                children: [
                  {
                    tagName: 'mj-section',
                    attributes: {},
                    children: [
                      {
                        tagName: 'mj-column',
                        attributes: {},
                        children: json ? handleGetContent(json?.content) : '',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    [handleGetContent, json]
  )

  // console.log({ html })

  return <Box boxSize="100%" as="iframe" title="email" srcDoc={html} />
}

const TipTapEditor = ({ onChange }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        style: 'height: 100%;',
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    onUpdate: (json) => {
      onChange(json.editor?.getJSON())
    },
    onCreate: (json) => {
      onChange(json.editor?.getJSON())
    },
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Wow, this editor instance exports its content as JSON.',
            },
          ],
        },
      ],
    },
  })

  return (
    <Box>
      {editor ? <MenuBar editor={editor} /> : null}
      <EditorContent style={{ height: '100%' }} editor={editor} />
    </Box>
  )
}

const MenuBar = ({ editor }) => {
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
      </Stack>
    </Box>
  )
}
