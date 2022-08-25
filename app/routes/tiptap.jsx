import { useMemo, useRef, useEffect, useCallback, useState } from 'react'
import {
  Box,
  Flex,
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
import { getNanoId } from '~/utils/functions'
import { BlockType } from '~/utils/types'
import { useLoaderData } from '@remix-run/react'
import Block from '~/components/Block'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
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

import styles from '~/styles/lowlight.css'
import Navbar from '~/components/Navbar'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export const loader = async () => {
  const blocks = [
    {
      type: BlockType.H1,
      details: {
        value: '<p>Get Started</p>',
      },
    },
    {
      type: BlockType.Divider,
      details: {},
    },
    {
      type: BlockType.Text,
      details: {
        value:
          '<p>👋 Welcome! This is a private page for you to play around with.</p>',
      },
    },
    {
      type: BlockType.Text,
      details: {
        value: '<p>Give these things a try:</p>',
      },
    },
    {
      type: BlockType.Text,
      details: {
        value: '<p>1. Hover on the left of each line for quick actions</p>',
      },
    },
    {
      type: BlockType.Text,
      details: {
        value: '<p>2. Click on the + button to add a new line</p>',
      },
    },
    {
      type: BlockType.Text,
      details: {
        value: '<p>3. Drag the ⋮⋮ button to reorder</p>',
      },
    },
    {
      type: BlockType.Text,
      details: {
        value: '<p>4. Click the trash icon to delete this block</p>',
      },
    },
    {
      type: BlockType.Text,
      details: {
        value:
          '<p>5. <strong>Bold</strong> and <em>italicize</em> using markdown e.g. *italic* or **bold**</p>',
      },
    },
    {
      type: BlockType.Text,
      details: {
        value:
          "<p>6. Add headers and dividers with '#', '##' or '---' followed by a space</p>",
      },
    },
    {
      type: BlockType.Text,
      details: {
        value:
          "<p>7. Type '/' for a menu to quickly switch blocks and search by typing</p>",
      },
    },
  ]

  return {
    blocks: blocks.map((b) => ({ ...b, id: getNanoId() })),
  }
}

export default function Tiptap() {
  const { blocks: loaderBlocks } = useLoaderData()
  const [blocks, setBlocks] = useState(loaderBlocks)

  const [previewSize, setPreviewSize] = useState('desktop')

  return (
    <Box>
      <Navbar
        json={blocks}
        previewSize={previewSize}
        setPreviewSize={setPreviewSize}
      />
      <SimpleGrid spacing="0" columns="2" h="100vh" pt="16">
        <Box h="100%">
          <Box maxW="648px" mx="auto" py="12">
            <Box ml="-48px">
              <EditView onChange={setBlocks} value={blocks} />
            </Box>
          </Box>
        </Box>
        <Box>
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
          {/* <ClientOnly>{() => <MjmlPreview json={blocks} />}</ClientOnly> */}
        </Box>
      </SimpleGrid>
    </Box>
  )
}

const EditView = ({ value, onChange }) => {
  const [activeItem, setActiveItem] = useState(null)

  const sensors = useSensors(
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor)
  )

  const handleOnChange = (idx, val) => {
    onChange((oldValue) => {
      const newBlocks = [...oldValue]
      newBlocks[idx] = {
        ...newBlocks[idx],
        details: val,
      }
      return newBlocks
    })
  }

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over?.id) {
      onChange((oldValue) => {
        const oldIndex = oldValue.findIndex(({ id }) => id === active.id)
        const newIndex = oldValue.findIndex(({ id }) => id === over.id)

        const newList = arrayMove(oldValue, oldIndex, newIndex)
        return newList
      })
    }
    setActiveItem(null)
  }

  const handleDragStart = ({ active: { id } }) => {
    setActiveItem(value.find((v) => v.id === id))
  }

  const handleAddItem = (idx, payload) => {
    onChange((oldValue) => {
      const newBlocks = [...oldValue]
      newBlocks.splice(idx, 0, payload)
      return newBlocks
    })
  }

  const handleRemoveItem = (idx) => {
    onChange((oldValue) => {
      const newBlocks = [...oldValue]
      newBlocks.splice(idx, 1)
      return newBlocks
    })
  }

  const handleDuplicateItem = (idx) => {
    onChange((oldValue) => {
      const newBlocks = [...oldValue]
      newBlocks.splice(idx + 1, 0, {
        ...newBlocks[idx],
        id: getNanoId(),
      })
      return newBlocks
    })
  }

  return (
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
