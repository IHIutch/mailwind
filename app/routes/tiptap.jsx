import { useMemo, useRef, useEffect, useCallback, useState } from 'react'
import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  Text,
  useOutsideClick,
} from '@chakra-ui/react'
import { ClientOnly } from 'remix-utils'
import { getComponentAttributes, getNanoId } from 'utils/functions'
import getHtml from '~/models/getHtml.client'
import { BlockType } from 'utils/types'
import { useLoaderData } from '@remix-run/react'
import Block from '~/components/Block'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  DragHandle,
  SortableItem,
  SortOverlay,
} from '~/components/sortable/SortableItem'
import { Copy, Plus, Trash2 } from 'lucide-react'

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
  const [activeItem, setActiveItem] = useState(null)

  const handleOnChange = (idx, val) => {
    const newBlocks = [...value]
    newBlocks[idx] = {
      ...newBlocks[idx],
      details: val,
    }
    onChange(newBlocks)
  }

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over?.id) {
      onChange(() => {
        const oldIndex = value.findIndex(({ id }) => id === active.id)
        const newIndex = value.findIndex(({ id }) => id === over.id)

        const newList = arrayMove(value, oldIndex, newIndex)
        return newList
      })
    }
    setActiveItem(null)
  }

  const sensors = useSensors(
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
    // useSensor(TouchSensor)
  )

  const handleDragStart = ({ active: { id } }) => {
    setActiveItem(value.find((v) => v.id === id))
  }

  const handleAddItem = (idx, payload) => {
    onChange(() => {
      const newBlocks = [...value]
      newBlocks.splice(idx, 0, payload)
      return newBlocks
    })
  }

  const handleRemoveItem = (idx) => {
    onChange(() => {
      const newBlocks = [...value]
      newBlocks.splice(idx, 1)
      return newBlocks
    })
  }

  const handleDuplicateItem = (idx) => {
    onChange(() => {
      const newBlocks = [...value]
      newBlocks.splice(idx + 1, 0, {
        ...newBlocks[idx],
        id: getNanoId(),
      })
      return newBlocks
    })
  }

  return (
    <Box>
      <Heading>Edit View</Heading>
      <Box>
        <DndContext
          id="dnd"
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => {
            setActiveItem(null)
          }}
        >
          <SortableContext items={value} strategy={verticalListSortingStrategy}>
            <List>
              {value.map((v, idx) => (
                <ListItem key={v.id}>
                  <SortableItem id={v.id}>
                    <Box
                      bg={activeItem?.id === v.id ? 'gray.200' : 'white'}
                      borderRadius="lg"
                      overflow="hidden"
                    >
                      <ItemBlock
                        v={v}
                        onChange={(val) => handleOnChange(idx, val)}
                        addItem={(value) => handleAddItem(idx + 1, value)}
                        removeItem={() => handleRemoveItem(idx)}
                        duplicateItem={() => handleDuplicateItem(idx)}
                      />
                    </Box>
                  </SortableItem>
                </ListItem>
              ))}
            </List>
          </SortableContext>
          <SortOverlay>
            {activeItem ? <ItemBlock v={activeItem} /> : null}
          </SortOverlay>
        </DndContext>
      </Box>
    </Box>
  )
}

const ItemBlock = ({ v, onChange, addItem, removeItem, duplicateItem }) => {
  const [isActive, setIsActive] = useState(false)
  const [isMenuActive, setIsMenuActive] = useState(false)

  const ref = useRef()
  useOutsideClick({
    ref: ref,
    handler: () => setIsActive(false),
  })

  return (
    <Flex
      ref={ref}
      px="6"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => {
        !isMenuActive && setIsActive(false)
      }}
    >
      <Box pt="2">
        <Stack
          direction="row"
          spacing="0"
          visibility={isActive ? 'visible' : 'hidden'}
        >
          {/* <IconButton
            size="xs"
            variant="ghost"
            icon={<Icon color="gray.500" boxSize="3.5" as={Trash2} />}
            onClick={removeItem}
          /> */}
          <Menu
            onOpen={() => setIsMenuActive(true)}
            onClose={() => setIsMenuActive(false)}
          >
            <MenuButton
              as={IconButton}
              size="xs"
              variant="ghost"
              icon={<Icon color="gray.500" boxSize="3.5" as={Plus} />}
            />

            <MenuList pt="0" pb="1">
              <MenuGroup
                title="Add Item"
                py="1"
                px="3"
                m="0"
                bg="gray.50"
                borderBottomWidth="1px"
                borderColor="gray.200"
              >
                {Object.entries(BlockType).map(([key, value], idx) => (
                  <MenuItem
                    key={idx}
                    py="1"
                    fontSize="sm"
                    fontWeight="medium"
                    onClick={() =>
                      addItem({
                        id: getNanoId(),
                        type: value,
                        details: {
                          value: '',
                        },
                      })
                    }
                  >
                    {key}
                  </MenuItem>
                ))}
              </MenuGroup>
            </MenuList>
          </Menu>
          <Menu
            onOpen={() => setIsMenuActive(true)}
            onClose={() => setIsMenuActive(false)}
          >
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={DragHandle}
                  isDragDisabled={isOpen}
                  // size="xs"
                  // variant="ghost"
                  // icon={<Icon color="gray.500" boxSize="3.5" as={Plus} />}
                />
                <MenuList>
                  {/* <MenuGroup
                    title="Convert Into"
                    py="1"
                    px="3"
                    m="0"
                    bg="gray.50"
                    borderBottomWidth="1px"
                    borderColor="gray.200"
                  > */}
                  <MenuItem
                    py="1"
                    fontSize="sm"
                    fontWeight="medium"
                    alignItems="center"
                    onClick={duplicateItem}
                  >
                    <Stack direction="row" align="center">
                      <Icon boxSize="3.5" as={Copy} />
                      <Text as="span">Duplicate Item</Text>
                    </Stack>
                  </MenuItem>
                  <MenuItem
                    py="1"
                    fontSize="sm"
                    fontWeight="medium"
                    alignItems="center"
                    onClick={removeItem}
                  >
                    <Stack direction="row" align="center">
                      <Icon boxSize="3.5" as={Trash2} />
                      <Text as="span">Delete Item</Text>
                    </Stack>
                  </MenuItem>
                  {/* </MenuGroup> */}
                </MenuList>
              </>
            )}
          </Menu>
          {/* <DragHandle /> */}
        </Stack>
      </Box>
      <Box flexGrow="1" p="2">
        <Block type={v.type} details={v.details} onChange={onChange} />
      </Box>
    </Flex>
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
