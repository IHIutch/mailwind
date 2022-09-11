import { useEffect, useState } from 'react'
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
  AlignCenter,
  AlignLeft,
  AlignRight,
  Code2,
  Copy,
  FlipVertical,
  Image,
  Palette,
  Plus,
  PlusCircle,
  PlusSquare,
  Quote,
  Settings,
  Trash2,
  Type,
} from 'lucide-react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import * as Popover from '@radix-ui/react-popover'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as Label from '@radix-ui/react-label'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

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
// import preflight from '~/styles/preflight.css'
import clsx from 'clsx'
import { HexColorPicker } from 'react-colorful'

// export function links() {
//   return [{ rel: 'stylesheet', href: preflight }]
// }

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
  const mobileSize = 480

  const formMethods = useForm({
    defaultValues: {
      global: {
        containerAlign: 'center',
        containerWidth: '600px',
        color: '#000000',
      },
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

  const global = useWatch({
    name: 'global',
    control: formMethods.control,
  })

  const colorsList = [
    { label: 'zinc.50', value: '#fafafa' },
    { label: 'zinc.100', value: '#f5f5f5' },
    { label: 'zinc.200', value: '#e5e5e5' },
    { label: 'zinc.300', value: '#d4d4d8' },
    { label: 'zinc.400', value: '#a1a1aa' },
    { label: 'zinc.500', value: '#71717a' },
    { label: 'zinc.600', value: '#52525b' },
    { label: 'zinc.700', value: '#3f3f46' },
    { label: 'zinc.800', value: '#262626' },
    { label: 'zinc.900', value: '#171717' },
  ]

  return (
    <div className="h-full pt-16">
      <FormProvider {...formMethods}>
        <Navbar
          previewSize={previewSize}
          setPreviewSize={setPreviewSize}
          handleDownload={formMethods.handleSubmit(handleDownload)}
        />
        <div className="flex h-full">
          <div
            className={clsx('px-4', [
              global.containerAlign === 'left' && 'mr-auto',
              global.containerAlign === 'center' && 'mx-auto',
              global.containerAlign === 'right' && 'ml-auto',
            ])}
          >
            <div
              className="relative py-12 px-6"
              style={{
                width:
                  previewSize === 'desktop'
                    ? parseInt(global.containerWidth.replace('px', '')) +
                      offset +
                      'px'
                    : mobileSize + offset + 'px',
                left: (offset * -1) / 2 + 'px',
              }}
            >
              <EditView />
            </div>
          </div>
          <div className="w-[300px] bg-white border-l border-zinc-200 h-full right-0 inset-y-0">
            <div className="py-4">
              <div className="mb-4 px-3">
                <h2 className="font-semibold">Global Attributes</h2>
              </div>
              <div className="mb-4 px-3">
                <fieldset>
                  <Label.Root htmlFor="containerAlignField" asChild>
                    <legend className="block text-gray-700 font-semibold text-sm mb-1">
                      Container Align
                    </legend>
                  </Label.Root>
                  <Controller
                    name={'global.containerAlign'}
                    control={formMethods.control}
                    render={({ field: { value, onChange } }) => (
                      <ToggleGroup.Root
                        id="containerAlignField"
                        type="single"
                        value={value}
                        onValueChange={(value) =>
                          value ? onChange(value) : null
                        }
                        className="inline-flex shadow-sm h-10 rounded-md"
                      >
                        <ToggleGroup.Item
                          value="left"
                          className="border border-r-0 text-zinc-500 hover:bg-indigo-50 border-zinc-300 font-bold py-1 px-2 rounded-l-md [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600 [&[data-state=on]]:border-indigo-100"
                        >
                          <AlignLeft className="w-5 h-5" />
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                          value="center"
                          className="border border-x-0 text-zinc-500 hover:bg-indigo-50 border-zinc-300 font-bold py-1 px-2 [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600 [&[data-state=on]]:border-indigo-100"
                        >
                          <AlignCenter className="w-5 h-5" />
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                          value="right"
                          className="border border-l-0 text-zinc-500 hover:bg-indigo-50 border-zinc-300 font-bold py-1 px-2 rounded-r-md [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600 [&[data-state=on]]:border-indigo-100"
                        >
                          <AlignRight className="w-5 h-5" />
                        </ToggleGroup.Item>
                      </ToggleGroup.Root>
                    )}
                  />
                </fieldset>
              </div>
              <div className="mb-4 px-3">
                <Label.Root
                  className="text-zinc-700 font-semibold text-sm mb-1"
                  htmlFor="globalWidthField"
                >
                  Container Width
                </Label.Root>
                <input
                  {...formMethods.register('global.containerWidth')}
                  id="globalWidthField"
                  type="text"
                  className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="px-3 border-t border-zinc-200 pt-4">
                <div className="mb-1">
                  <span className="text-zinc-700 font-semibold text-sm">
                    Text Color
                  </span>
                </div>
                <div className="flex h-[42px]">
                  <div className="grow">
                    <Popover.Root>
                      <Popover.Trigger className="text-left w-full rounded-l-md border py-2 px-3 border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <div className="flex items-center">
                          <div
                            className="h-4 w-4 rounded"
                            style={{ backgroundColor: global.color }}
                          ></div>
                          <span className="ml-2">{global.color}</span>
                        </div>
                      </Popover.Trigger>
                      <Popover.Anchor />
                      <Popover.Portal>
                        <Popover.Content className="p-1 rounded-lg shadow-lg">
                          <Controller
                            name={'global.color'}
                            control={formMethods.control}
                            render={({ field: { value, onChange } }) => (
                              <HexColorPicker
                                color={value}
                                onChange={onChange}
                              />
                            )}
                          />
                        </Popover.Content>
                      </Popover.Portal>
                    </Popover.Root>
                  </div>
                  <div className="h-full">
                    <Popover.Root>
                      <Popover.Trigger className="h-full text-left w-full rounded-r-md border border-l-0 py-2 px-3 border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <Palette className="w-4 h-4" />
                      </Popover.Trigger>
                      <Popover.Anchor />
                      <Popover.Portal>
                        <Popover.Content className="p-3 rounded-lg shadow-lg w-fit max-h-48 overflow-y-auto">
                          <Controller
                            name={'global.color'}
                            control={formMethods.control}
                            render={({ field: { value, onChange } }) => (
                              <RadioGroup.Root
                                value={value}
                                onValueChange={onChange}
                                className="grid grid-cols-5 grid-flow-row gap-2"
                              >
                                {colorsList.map((color, idx) => (
                                  <RadioGroup.Item
                                    key={idx}
                                    value={color.value}
                                    className="w-8 h-8 rounded-full [&[data-state=checked]]:ring-2 [&[data-state=checked]]:ring-offset-2 [&[data-state=checked]]:ring-indigo-700"
                                    style={{ backgroundColor: color.value }}
                                  ></RadioGroup.Item>
                                ))}
                              </RadioGroup.Root>
                            )}
                          />
                        </Popover.Content>
                      </Popover.Portal>
                    </Popover.Root>
                  </div>
                </div>

                {/* <label
                  className="block text-zinc-700 font-semibold text-sm mb-1"
                  htmlFor="globalColorField"
                >
                  Text Color
                </label>
                <input
                  {...formMethods.register('global.color')}
                  id="globalColorField"
                  type="text"
                  className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                /> */}
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
          <DropdownMenu.Root onOpenChange={setIsMenuActive}>
            <DropdownMenu.Trigger asChild>
              <button className="h-6 w-6 rounded hover:bg-zinc-100 flex items-center justify-center">
                <Plus className="w-4 h-4 text-gray-500" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="start"
                className="w-48 py-2 bg-white rounded-md border border-zinc-200 shadow-lg"
              >
                {Object.entries(BlockType).map(([key, blockTypeValue], idx) => (
                  <DropdownMenu.Item
                    key={idx}
                    className="flex items-center hover:bg-zinc-100 py-1 px-2 outline-none cursor-pointer"
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
                    {getIcon(blockTypeValue)}
                    <p className="pl-2">{key}</p>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          <DropdownMenu.Root onOpenChange={setIsMenuActive}>
            <DropdownMenu.Trigger asChild>
              <DragHandle className="h-6 w-6 rounded hover:bg-zinc-100 flex items-center justify-center" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="start"
                className="w-48 py-2 bg-white rounded-md border border-zinc-200 shadow-lg"
              >
                <DropdownMenu.Item
                  className="flex items-center hover:bg-zinc-100 py-1 px-2 outline-none cursor-pointer"
                  onClick={duplicateItem}
                >
                  <Copy className="h-4 w-4" />
                  <p className="pl-2">Duplicate Item</p>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex items-center hover:bg-zinc-100 py-1 px-2 outline-none cursor-pointer"
                  onClick={removeItem}
                >
                  <Trash2 className="h-4 w-4" />
                  <p className="pl-2">Delete Item</p>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          {/* <Popover
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
          </Popover> */}
        </div>
      </div>
      <div className="grow pl-2">
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
