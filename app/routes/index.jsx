import { useEffect, useRef, useState } from 'react'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useOutsideClick,
} from '@chakra-ui/react'
import { getNanoId } from '~/utils/functions'
import { BlockType, defaultAttributes } from '~/utils/types'
import { useFetcher, useLoaderData } from '@remix-run/react'
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
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import preflight from '~/styles/preflight.css'
import clsx from 'clsx'

export function links() {
  return [{ rel: 'stylesheet', href: preflight }]
}

export const loader = async () => {
  const blocks = [
    {
      type: BlockType.H1,
      value: '<p>Get Started</p>',
    },
    {
      type: BlockType.Divider,
    },
    {
      type: BlockType.Text,
      value:
        '<p>👋 Welcome! This is a private page for you to play around with.</p>',
    },
    {
      type: BlockType.Text,
      value: '<p>Give these things a try:</p>',
    },
    {
      type: BlockType.Text,
      value: '<p>1. Hover on the left of each line for quick actions</p>',
    },

    {
      type: BlockType.Text,
      value: '<p>2. Click on the + button to add a new line</p>',
    },
    {
      type: BlockType.Text,
      value: '<p>3. Drag the ⋮⋮ button to reorder</p>',
    },
    {
      type: BlockType.Text,
      value: '<p>4. Click the trash icon to delete this block</p>',
    },
    {
      type: BlockType.Text,
      value:
        '<p>5. <strong>Bold</strong> and <em>italicize</em> using markdown e.g. *italic* or **bold**</p>',
    },
    {
      type: BlockType.Text,
      value:
        "<p>6. Add headers and dividers with '#', '##' or '---' followed by a space</p>",
    },
    {
      type: BlockType.Text,
      value:
        "<p>7. Type '/' for a menu to quickly switch blocks and search by typing</p>",
    },
  ]

  return {
    blocks: blocks.map((b) => ({
      ...b,
      id: getNanoId(),
      attributes: {
        padding:
          defaultAttributes?.[b.type]?.padding ||
          defaultAttributes.global.padding,
      },
    })),
  }
}

export default function Tiptap() {
  const { blocks: loaderBlocks } = useLoaderData()
  const htmlFetcher = useFetcher()

  const [previewSize, setPreviewSize] = useState('desktop')

  const offset = 72
  const desktopSize = 600
  const mobileSize = 480

  const formMethods = useForm({
    defaultValues: {
      blocks: loaderBlocks,
    },
  })

  const handleDownload = async (formData) => {
    htmlFetcher.submit(
      {
        json: JSON.stringify(formData.blocks),
      },
      { method: 'post', action: '/download' }
    )
  }

  useEffect(() => {
    if (htmlFetcher.data?.html) {
      var blob = new Blob([htmlFetcher.data.html], {
        type: 'text/html;charset=utf-8',
      })
      var link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'email.html'

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
    }
  }, [htmlFetcher.data?.html])

  return (
    <div>
      <FormProvider {...formMethods}>
        <Navbar
          previewSize={previewSize}
          setPreviewSize={setPreviewSize}
          handleDownload={formMethods.handleSubmit(handleDownload)}
        />
        <div className="h-full">
          <div className="py-12 mt-16">
            <div className="px-6">
              <div
                className="relative mx-auto"
                style={{
                  width:
                    previewSize === 'desktop'
                      ? desktopSize + offset + 'px'
                      : mobileSize + offset + 'px',
                  left: (offset * -1) / 2 + 'px',
                }}
              >
                <EditView />
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
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
    </div>
  )
}

const EditView = () => {
  const [activeItem, setActiveItem] = useState(null)
  const { control, getValues, watch } = useFormContext()
  const { fields, remove, move, insert } = useFieldArray({
    keyName: 'uuid', // Prevent overwriting "id" key
    control,
    name: 'blocks',
  })

  const sensors = useSensors(
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(TouchSensor)
  )

  const handleDragEnd = ({
    active: { data: activeData },
    over: { data: overData },
  }) => {
    const activeIdx = activeData?.current?.sortable?.index
    const overIdx = overData?.current?.sortable?.index
    if (overIdx && activeIdx !== overIdx) {
      move(activeIdx, overIdx)
    }
    setActiveItem(null)
  }

  const handleDragStart = ({ active: { data: activeData } }) => {
    const activeIdx = activeData?.current?.sortable?.index
    const item = getValues(`blocks.${activeIdx}`)
    setActiveItem(item)
  }

  const handleDuplicateItem = (idx) => {
    const item = getValues(`blocks.${idx}`)
    insert(idx + 1, {
      ...item,
      id: getNanoId(),
    })
  }

  return (
    <div>
      <DndContext
        id="dnd"
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => {
          setActiveItem(null)
        }}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          <ul>
            {fields.map((v, idx) => (
              <li key={v.id}>
                <SortableItem id={v.id}>
                  <div
                    className={clsx(
                      'rounded-lg overflow-hidden',
                      activeItem?.id === v.id ? 'bg-gray-200' : 'bg-white'
                    )}
                  >
                    <ItemBlock
                      itemIndex={idx}
                      addItem={(payload) => insert(idx + 1, payload)}
                      removeItem={() => remove(idx)}
                      duplicateItem={() => handleDuplicateItem(idx)}
                    >
                      <Controller
                        name={`blocks.${idx}.value`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Block
                            attributes={watch(`blocks.${idx}.attributes`)}
                            type={getValues(`blocks.${idx}.type`)}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </ItemBlock>
                  </div>
                </SortableItem>
              </li>
            ))}
          </ul>
        </SortableContext>
        <SortOverlay>
          {activeItem ? (
            <ItemBlock>
              <Block type={activeItem.type} value={activeItem.value} />
            </ItemBlock>
          ) : null}
        </SortOverlay>
      </DndContext>
    </div>
  )
}

const ItemBlock = ({
  itemIndex,
  addItem,
  removeItem,
  duplicateItem,
  children,
}) => {
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
        return <Type className="w-4 h-4" />
      case BlockType['Divider']:
        return <FlipVertical className="w-4 h-4" />
      case BlockType['Code']:
        return <Code2 className="w-4 h-4" />
      case BlockType['Image']:
        return <Image className="w-4 h-4" />
      case BlockType['Quote']:
        return <Quote className="w-4 h-4" />
      case BlockType['H1']:
        return <PlusCircle className="w-4 h-4" />
      default:
        return <PlusSquare className="w-4 h-4" />
    }
  }

  const { control } = useFormContext()
  const itemType = useWatch({
    name: `blocks.${itemIndex}.type`,
    control,
  })

  const itemPadding = useWatch({
    name: `blocks.${itemIndex}.attributes.padding`,
    control,
  })

  return (
    <div
      className="flex"
      style={{
        paddingTop: itemPadding?.[0] || '0',
        paddingBottom: itemPadding?.[2] || '0',
      }}
      ref={ref}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => {
        !isMenuActive && setIsActive(false)
      }}
    >
      <div
        className={clsx(
          itemType === BlockType['H1'] ||
            itemType === BlockType['H2'] ||
            itemType === BlockType['H3']
            ? 'pt-2'
            : 'pt-0'
        )}
      >
        <div
          className={clsx(
            'flex transition-all',
            isActive ? 'visible opacity-100' : 'invisible opacity-0'
          )}
        >
          <Menu
            onOpen={() => setIsMenuActive(true)}
            onClose={() => setIsMenuActive(false)}
          >
            <MenuButton
              as={IconButton}
              size="xs"
              variant="ghost"
              icon={<Plus className="h-4 w-4 text-gray-500" />}
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
                {Object.entries(BlockType).map(([key, blockTypeValue], idx) => (
                  <MenuItem
                    key={idx}
                    py="1"
                    fontSize="sm"
                    fontWeight="medium"
                    onClick={() =>
                      addItem({
                        id: getNanoId(),
                        type: blockTypeValue,
                        value: '',
                        attributes: {
                          ...defaultAttributes.global,
                          ...(defaultAttributes?.[blockTypeValue] || {}),
                        },
                      })
                    }
                  >
                    <div className="flex items-center">
                      {getIcon(blockTypeValue)}
                      <p className="pl-2">{key}</p>
                    </div>
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
                    <div className="flex items-center">
                      <Copy className="h-4 w-4" />
                      <p className="pl-2">Duplicate Item</p>
                    </div>
                  </MenuItem>
                  <MenuItem
                    py="1"
                    fontSize="sm"
                    fontWeight="medium"
                    alignItems="center"
                    onClick={removeItem}
                  >
                    <div className="flex items-center">
                      <Trash2 className="h-4 w-4" />
                      <p className="pl-2">Delete Item</p>
                    </div>
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
                icon={<Settings className="h-4 w-4 text-gray-500" />}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <Controller
                  name={`blocks.${itemIndex}.attributes.padding`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <PaddingController value={value} onChange={onChange} />
                  )}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="grow px-2">
        <div
          style={{
            paddingLeft: itemPadding?.[1] || '0',
            paddingRight: itemPadding?.[3] || '0',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
