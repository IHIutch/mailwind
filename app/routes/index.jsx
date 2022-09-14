import { useEffect, useState } from 'react'
import { getNanoId } from '~/utils/functions'
import { BlockType, defaultAttributes } from '~/utils/types'
import { useFetcher, useLoaderData } from '@remix-run/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
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

import Navbar from '~/components/Navbar'
import DynamicBlock from '~/components/DynamicBlock'
import DynamicSidebar from '~/components/DynamicSidebar'
import {
  Code2,
  Copy,
  FlipVertical,
  Image,
  Plus,
  PlusCircle,
  PlusSquare,
  Quote,
  Trash2,
  Type,
} from 'lucide-react'

import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form'

import { setActiveBlock, useActiveBlockDispatch } from '~/context/activeBlock'
import clsx from 'clsx'

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

export default function Index() {
  const { blocks: loaderBlocks } = useLoaderData()
  const htmlFetcher = useFetcher()

  const [previewSize, setPreviewSize] = useState('desktop')

  const offset = '56px'
  const mobileSize = '480px'

  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      global: {
        containerAlign: 'center',
        containerWidth: '600px',
        color: '#000000',
      },
      some: {
        test: '123px',
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

  return (
    <div className="pt-16">
      <FormProvider {...formMethods}>
        <Navbar
          previewSize={previewSize}
          setPreviewSize={setPreviewSize}
          handleDownload={formMethods.handleSubmit(handleDownload)}
        />
        <div>
          <div className="fixed inset-y-0 top-16 w-[calc(100%-300px)]">
            <div className="flex h-full overflow-y-auto">
              <div
                className={clsx('relative py-12 px-4', [
                  global.containerAlign === 'left' && 'mr-auto',
                  global.containerAlign === 'center' && 'mx-auto',
                  global.containerAlign === 'right' && 'ml-auto',
                ])}
                style={{
                  width:
                    previewSize === 'desktop'
                      ? `calc(${global.containerWidth} - ${offset})`
                      : `calc(${mobileSize} - ${offset})`,
                  left: `calc(${offset} * -1 / 2)`,
                }}
              >
                <EditView />
              </div>
            </div>
          </div>
          <div className="fixed inset-y-0 right-0 w-[300px] border-l border-zinc-200 bg-white pt-16">
            <div className="h-full overflow-y-auto">
              <div className="py-4">
                <DynamicSidebar />
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
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
                      'overflow-hidden rounded-lg',
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
                          <DynamicBlock
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
              <DynamicBlock type={activeItem.type} value={activeItem.value} />
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
  const dispatch = useActiveBlockDispatch()
  const [isActive, setIsActive] = useState(false)
  const [isMenuActive, setIsMenuActive] = useState(false)

  const getIcon = (value) => {
    switch (value) {
      case BlockType['Text']:
        return <Type className="h-4 w-4" />
      case BlockType['Divider']:
        return <FlipVertical className="h-4 w-4" />
      case BlockType['Code']:
        return <Code2 className="h-4 w-4" />
      case BlockType['Image']:
        return <Image className="h-4 w-4" />
      case BlockType['Quote']:
        return <Quote className="h-4 w-4" />
      case BlockType['H1']:
        return <PlusCircle className="h-4 w-4" />
      default:
        return <PlusSquare className="h-4 w-4" />
    }
  }

  const { control, getValues } = useFormContext()
  const itemType = useWatch({
    name: `blocks.${itemIndex}.type`,
    control,
  })

  const itemPadding = useWatch({
    name: `blocks.${itemIndex}.attributes.padding`,
    control,
  })

  const handleSetActiveItem = () => {
    const { id, type } = getValues(`blocks.${itemIndex}`)
    dispatch(
      setActiveBlock({
        id,
        type,
      })
    )
  }

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
      onClick={handleSetActiveItem}
    >
      <div
        className={clsx(
          'pr-2',
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
              <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-zinc-100">
                <Plus className="h-4 w-4 text-gray-500" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="start"
                className="w-48 rounded-md border border-zinc-200 bg-white py-2 shadow-lg"
              >
                {Object.entries(BlockType).map(([key, blockTypeValue], idx) => (
                  <DropdownMenu.Item
                    key={idx}
                    className="flex cursor-pointer items-center py-1 px-2 outline-none hover:bg-zinc-100"
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
              <DragHandle
                isDragDisabled={isMenuActive}
                className="flex h-6 w-6 items-center justify-center rounded hover:bg-zinc-100"
              />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="start"
                className="w-48 rounded-md border border-zinc-200 bg-white py-2 shadow-lg"
              >
                <DropdownMenu.Item
                  className="flex cursor-pointer items-center py-1 px-2 outline-none hover:bg-zinc-100"
                  onClick={duplicateItem}
                >
                  <Copy className="h-4 w-4" />
                  <p className="pl-2">Duplicate Item</p>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex cursor-pointer items-center py-1 px-2 outline-none hover:bg-zinc-100"
                  onClick={removeItem}
                >
                  <Trash2 className="h-4 w-4" />
                  <p className="pl-2">Delete Item</p>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
      <div className="grow">
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
