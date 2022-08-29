import { useRef, useState } from 'react'
import {
  Box,
  Button,
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
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
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
import {
  Code2,
  Copy,
  FlipVertical,
  Image,
  Plus,
  PlusCircle,
  PlusSquare,
  Quote,
  Settings,
  Trash2,
  Type,
} from 'lucide-react'

import Navbar from '~/components/Navbar'
import PaddingController from '~/components/controllers/PaddingController'
import styles from 'prismjs/themes/prism.css' //Example style, you can use another

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

  const offset = 72
  const desktopSize = 600
  const mobileSize = 480

  return (
    <Box>
      <Navbar
        json={blocks}
        previewSize={previewSize}
        setPreviewSize={setPreviewSize}
      />
      <Box h="100%">
        <Box py="12" mt="16">
          <Box px="6">
            <Box
              position="relative"
              left={(offset * -1) / 2 + 'px'}
              mx="auto"
              w={
                previewSize === 'desktop'
                  ? desktopSize + offset + 'px'
                  : mobileSize + offset + 'px'
              }
            >
              <EditView onChange={setBlocks} value={blocks} />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <Box>
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
        </Box> */}
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

  const getIcon = (value) => {
    switch (value) {
      case BlockType['Text']:
        return Type
      case BlockType['Divider']:
        return FlipVertical
      case BlockType['Code']:
        return Code2
      case BlockType['Image']:
        return Image
      case BlockType['Quote']:
        return Quote
      case BlockType['H1']:
        return PlusCircle
      default:
        return PlusSquare
    }
  }

  return (
    <Flex
      ref={ref}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => {
        !isMenuActive && setIsActive(false)
      }}
      py="2"
    >
      <Box
        pt={
          v.type === BlockType['H1'] ||
          v.type === BlockType['H2'] ||
          v.type === BlockType['H3']
            ? 3
            : 0
        }
      >
        <Stack
          direction="row"
          spacing="0"
          visibility={isActive ? 'visible' : 'hidden'}
          opacity={isActive ? '1' : '0'}
          transition="all 0.2s cubic-bezier(0, 0, 0.2, 1)"
        >
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
                    <Stack direction="row" align="center">
                      <Icon boxSize="3.5" as={getIcon(value)} />
                      <Text as="span">{key}</Text>
                    </Stack>
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
                <MenuButton as={DragHandle} isDragDisabled={isOpen} />
                <MenuList>
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
                </MenuList>
              </>
            )}
          </Menu>
          <Popover
            onOpen={() => setIsMenuActive(true)}
            onClose={() => setIsMenuActive(false)}
            placement="bottom-start"
          >
            <PopoverTrigger>
              <IconButton
                size="xs"
                variant="ghost"
                icon={<Icon color="gray.500" boxSize="3.5" as={Settings} />}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <Box>
                  <PaddingController label="Padding" onChange={console.log} />
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Stack>
      </Box>
      <Box flexGrow="1" px="2">
        <Block type={v.type} details={v.details} onChange={onChange} />
      </Box>
    </Flex>
  )
}
