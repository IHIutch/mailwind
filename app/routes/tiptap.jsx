import { useMemo, useRef, useEffect, useCallback, useState } from 'react'
import { Box, Center, Flex, Heading, Icon, SimpleGrid } from '@chakra-ui/react'
import { ClientOnly } from 'remix-utils'
import { getComponentAttributes, getNanoId } from 'utils/functions'
import getHtml from '~/models/getHtml.client'
import { BlockType } from 'utils/types'
import { useLoaderData } from '@remix-run/react'
import Block from '~/components/Block'
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from 'react-beautiful-dnd'
import { GripVertical } from 'lucide-react'

export const loader = async () => {
  const blocks = [
    {
      id: getNanoId(),
      type: BlockType.H1,
      details: {
        value: '<p>Get Started</p>',
      },
    },
    {
      id: getNanoId(),
      type: BlockType.Divider,
      details: {},
    },
    {
      id: getNanoId(),
      type: BlockType.Text,
      details: {
        value:
          '<p>👋 Welcome! This is a private page for you to play around with.</p>',
      },
    },
    {
      id: getNanoId(),
      type: BlockType.Text,
      details: {
        value: '<p>Give these things a try:</p>',
      },
    },
    {
      id: getNanoId(),
      type: BlockType.Text,
      details: {
        value: '<p>1. Hover on the left of each line for quick actions</p>',
      },
    },
    {
      id: getNanoId(),
      type: BlockType.Text,
      details: {
        value: '<p>2. Click on the + button to add a new line</p>',
      },
    },
    {
      id: getNanoId(),
      type: BlockType.Text,
      details: {
        value: '<p>3. Drag the ⋮⋮ button to reorder</p>',
      },
    },
    {
      id: getNanoId(),
      type: BlockType.Text,
      details: {
        value: '<p>4. Click the trash icon to delete this block</p>',
      },
    },
    {
      id: getNanoId(),
      type: BlockType.Text,
      details: {
        value:
          '<p>5. <strong>Bold</strong> and <em>italicize</em> using markdown e.g. *italic* or **bold**</p>',
      },
    },
    {
      id: getNanoId(),
      type: BlockType.Text,
      details: {
        value:
          "<p>6. Add headers and dividers with '#', '##' or '---' followed by a space</p>",
      },
    },
    {
      id: getNanoId(),
      type: BlockType.Text,
      details: {
        value:
          "<p>7. Type '/' for a menu to quickly switch blocks and search by typing</p>",
      },
    },
  ]

  return {
    blocks,
  }
}

export default function Tiptap() {
  const { blocks: loaderBlocks } = useLoaderData()
  const [blocks, setBlocks] = useState(loaderBlocks)
  return (
    <SimpleGrid spacing="0" columns="2" h="100vh">
      <Box h="100%">
        <EditView onChange={setBlocks} value={blocks} />
      </Box>
      <Box>
        <code>
          <pre>
            {JSON.stringify(
              blocks.map((b) => {
                return [
                  BlockType.Text,
                  BlockType.H1,
                  BlockType.H2,
                  BlockType.H3,
                ].includes(b.type)
                  ? {
                      ...b,
                      details: {
                        value: b.details.value,
                        // .replaceAll('<p>', '')
                        // .replaceAll('</p>', '')
                        // .replaceAll('<strong>', '**')
                        // .replaceAll('</strong>', '**')
                        // .replaceAll('<em>', '*')
                        // .replaceAll('</em>', '*')
                        // .replaceAll(/<br.*?>/g, ''),
                      },
                    }
                  : b
              }),
              null,
              2
            )}
          </pre>
        </code>
        {/* <ClientOnly>{() => <MjmlPreview json={blocks} />}</ClientOnly> */}
      </Box>
    </SimpleGrid>
  )
}

const EditView = ({ value, onChange }) => {
  const handleOnChange = (idx, val) => {
    const newBlocks = [...value]
    newBlocks[idx] = {
      ...newBlocks[idx],
      details: val,
    }
    onChange(newBlocks)
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const newItems = reorder(
      value,
      result.source.index,
      result.destination.index
    )

    onChange(newItems)
  }

  resetServerContext()

  return (
    <Box>
      <Heading>Edit View</Heading>
      <Box>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {value.map((v, idx) => (
                  <Draggable key={v.id} draggableId={v.id} index={idx}>
                    {(provided, snapshot) => (
                      <Box ref={provided.innerRef} {...provided.draggableProps}>
                        <Flex>
                          <Center
                            p="2"
                            color="gray.500"
                            {...provided.dragHandleProps}
                          >
                            <Icon boxSize="4" as={GripVertical} />
                          </Center>
                          <Box flexGrow="1" p="2">
                            <Block
                              type={v.type}
                              details={v.details}
                              onChange={(val) => handleOnChange(idx, val)}
                            />
                          </Box>
                        </Flex>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Box>
  )
}

const MjmlPreview = ({ json }) => {
  console.log({ json })
  const handleFormatText = (arr, isFormatting = true) => {
    return arr
      .map((a) => {
        const types = isFormatting && a?.marks ? a.marks.map((m) => m.type) : []
        const linkAttrs = types.includes('link')
          ? a.marks.find((m) => m.type === 'link').attrs
          : {}
        return types.includes('link')
          ? `<a
              href="${linkAttrs.href}"
              target="${linkAttrs.target}"
              rel="noopener noreferrer nofollow"
            >${a.text}</a>`
          : `<span
              style="
              ${types.includes('bold') ? 'font-weight:bold;' : ''}
              ${types.includes('italic') ? 'font-style:italic;' : ''}
              ${types.includes('strike') ? 'text-decoration:line-through;' : ''}
              "
            >${a.text}</span>`
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

        case 'image':
          return {
            tagName: 'mj-image',
            'css-class': 'image',
            attributes: {
              ...handleGetAttrs('mj-image'),
              src: a.attrs.src,
              alt: a.attrs.alt,
              title: a.attrs.title,
            },
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

        case 'horizontalRule':
          return {
            tagName: 'mj-divider',
            'css-class': 'divider',
            attributes: {
              ...handleGetAttrs('mj-divider'),
            },
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

  const iframe = useRef()
  useEffect(() => {
    let doc = iframe.current.contentDocument
    doc.open()
    doc.write(html)
    doc.close()
  }, [html])

  return <Box boxSize="100%" as="iframe" ref={iframe} />
}
