import { useEffect, useMemo, useState } from 'react'
import { getNanoId } from '~/utils/functions'
import { BlockType, defaultAttributes } from '~/utils/types'
import { useFetcher, useLoaderData } from '@remix-run/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Dialog from '@radix-ui/react-dialog'
import * as Label from '@radix-ui/react-label'
import * as Popover from '@radix-ui/react-popover'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
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
  Settings,
  X,
  Send,
} from 'lucide-react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form'

import {
  setActiveBlock,
  useActiveBlockDispatch,
  useActiveBlockState,
} from '~/context/activeBlock'
import clsx from 'clsx'
import GlobalNavbar from '~/components/GlobalNavbar'
import { prismaGetTemplate } from '~/utils/prisma/templates.server'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import { prismaGetBlocks } from '~/utils/prisma/blocks.server'

export const loader = async ({ params: { templateId } }) => {
  const blocks = await prismaGetBlocks({ templateId: templateId })
  const template = await prismaGetTemplate({ id: templateId })

  return {
    blocks,
    template,
  }
}

export default function TemplateEdit() {
  const { blocks: loaderBlocks } = useLoaderData()
  const { data: activeBlock } = useActiveBlockState()
  const blockFetcher = useFetcher()
  const downloadFetcher = useFetcher()

  const [previewSize, setPreviewSize] = useState('desktop')

  const offset = '80px'
  const mobileSize = '480px'

  const formMethods = useForm({
    mode: 'onChange',
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
    downloadFetcher.submit(
      {
        json: JSON.stringify(formData.blocks),
      },
      { method: 'post', action: '/api/download' }
    )
  }

  useEffect(() => {
    if (downloadFetcher.data?.html) {
      var blob = new Blob([downloadFetcher.data.html], {
        type: 'text/html;charset=utf-8',
      })
      var link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'email.html'

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
    }
  }, [downloadFetcher.data?.html])

  const global = useWatch({
    name: 'global',
    control: formMethods.control,
  })

  const blocks = useWatch({
    name: 'blocks',
    control: formMethods.control,
  })

  const autoSaveDebounce = useMemo(
    () =>
      debounce((activeBlockIdx) => {
        const blockValue = formMethods.getValues(`blocks.${activeBlockIdx}`)
        blockFetcher.submit(
          {
            payload: JSON.stringify({
              value: blockValue.value,
              attributes: blockValue.attributes,
              position: activeBlockIdx,
            }),
          },
          { method: 'post', action: `/api/blocks/${blockValue.id}` }
        )
      }, 750),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (formMethods.formState.isDirty && activeBlock?.index)
      autoSaveDebounce(activeBlock.index)
  }, [
    autoSaveDebounce,
    formMethods.formState.isDirty,
    blocks,
    activeBlock?.index,
  ])
  // TODO: Save blocks w/in their components, when the attributes change. We dont want to autosave when a block is dragged, we want to save that manually.

  return (
    <div className="h-full">
      <GlobalNavbar>
        <TemplateTitle />
      </GlobalNavbar>
      <div className="relative flex h-full pt-16">
        <FormProvider {...formMethods}>
          <div className="flex h-full w-[calc(100%-300px)] flex-col">
            <EditorNavbar
              previewSize={previewSize}
              setPreviewSize={setPreviewSize}
              handleDownload={formMethods.handleSubmit(handleDownload)}
            />
            <div className="grow overflow-y-auto">
              <div className="">
                <div
                  className={clsx('relative py-12 px-4', [
                    global.containerAlign === 'left' && 'mr-auto',
                    global.containerAlign === 'center' && 'mx-auto',
                    global.containerAlign === 'right' && 'ml-auto',
                  ])}
                  style={{
                    width:
                      previewSize === 'desktop'
                        ? `calc(${global.containerWidth} + ${offset})`
                        : `calc(${mobileSize} + ${offset})`,
                    left: offset,
                  }}
                >
                  <EditView />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[300px] shrink-0 border-l border-zinc-200 bg-white">
            <div className="h-full overflow-y-auto">
              <div className="py-4">
                <DynamicSidebar />
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}
const TemplateTitle = () => {
  const { template } = useLoaderData()
  const [open, setOpen] = useState(false)

  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.type === 'done') {
      setOpen(false)
    }
  }, [fetcher.type])

  return (
    <div className="mx-4 flex items-center border-l border-gray-300 px-4">
      <div>
        <p className="font-medium">{template.title ?? 'Untitled Template'}</p>
        <p className="text-xs text-neutral-500">
          Last Modified: {dayjs(template.updatedAt).format('MMM D, h:mma')}
        </p>
      </div>
      <div className="ml-4">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger
            className={clsx(
              'flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 p-1 transition-colors',
              'hover:bg-neutral-200'
            )}
          >
            <Settings className="h-5 w-5" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay
              className={clsx(
                'fixed inset-0 z-40 bg-neutral-900',
                '[&[data-state=open]]:opacity-40'
              )}
            />
            <div className="fixed inset-0 z-50 flex items-start justify-center">
              <Dialog.Content className="relative my-16 flex w-full max-w-[28rem] flex-col rounded-md bg-white">
                <header className="p-4">
                  <Dialog.Title className="text-2xl font-semibold">
                    Edit Template Title
                  </Dialog.Title>
                </header>
                <Dialog.Close asChild className="absolute top-2 right-3">
                  <button
                    className={clsx(
                      'rounded-lg bg-neutral-100 p-1 transition-colors',
                      'hover:bg-neutral-200'
                    )}
                  >
                    <X />
                  </button>
                </Dialog.Close>
                <fetcher.Form method="post">
                  <div className="p-4">
                    <Label.Root
                      htmlFor="template-title"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      Title
                    </Label.Root>
                    <input
                      id="template-title"
                      name="title"
                      type="text"
                      className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
                      defaultValue={template.title}
                      // aria-describedby={
                      //   fetcher.data?.error ?? `email-error-message`
                      // }
                      // aria-invalid={fetcher.data?.error ? 'true' : 'false'}
                    />
                    {/* {fetcher.data?.error ? (
                            <p
                              id="email-error-message"
                              className="mt-1 text-xs text-red-500"
                            >
                              {fetcher.data?.error?.message}
                            </p>
                          ) : null} */}
                  </div>
                  <footer className="flex p-4">
                    <div className="ml-auto">
                      <Dialog.Close className="h-8 rounded border border-zinc-300 px-2 text-sm font-semibold text-zinc-500 hover:bg-indigo-50">
                        Cancel
                      </Dialog.Close>
                      <button
                        disabled={fetcher.state !== 'idle'}
                        type="submit"
                        className={clsx(
                          'ml-2 h-8 rounded bg-indigo-500 px-2 text-sm font-semibold text-white hover:bg-indigo-600',
                          'disabled:opacity-40'
                        )}
                      >
                        Save
                      </button>
                    </div>
                  </footer>
                </fetcher.Form>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  )
}

const EditView = () => {
  const dispatch = useActiveBlockDispatch()
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

    const { id, type } = getValues(`blocks.${overIdx}`)
    dispatch(
      setActiveBlock({
        index: overIdx,
        id,
        type,
      })
    )
  }

  const handleSetActiveBlock = (itemIndex) => {
    const { id, type } = getValues(`blocks.${itemIndex}`)
    dispatch(
      setActiveBlock({
        index: itemIndex,
        id,
        type,
      })
    )
  }

  const handleDragStart = ({ active: { data: activeData } }) => {
    const activeIdx = activeData?.current?.sortable?.index
    const item = getValues(`blocks.${activeIdx}`)
    setActiveItem(item)
  }

  const handleAddItem = (idx, payload) => {
    // TODO: POST to create new block in DB
    insert(idx, payload)
    handleSetActiveBlock(idx)
  }

  const handleDuplicateItem = (idx) => {
    const item = getValues(`blocks.${idx}`)
    // TODO: POST to create new block in DB
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
                      'overflow-hidden rounded-lg transition-all',
                      activeItem?.id === v.id
                        ? 'ring-2 ring-offset-2'
                        : 'ring-0 ring-offset-0'
                    )}
                  >
                    <ItemBlock
                      itemIndex={idx}
                      addItem={(payload) => handleAddItem(idx + 1, payload)}
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

  const itemPaddingTop = useWatch({
    name: `blocks.${itemIndex}.attributes.paddingTop`,
    control,
  })

  const handleSetActiveBlock = () => {
    const { id, type } = getValues(`blocks.${itemIndex}`)
    dispatch(
      setActiveBlock({
        index: itemIndex,
        id,
        type,
      })
    )
  }

  return (
    <div
      className="flex"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => {
        !isMenuActive && setIsActive(false)
      }}
      onClick={handleSetActiveBlock}
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
          style={{ paddingTop: itemPaddingTop }}
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
                    onClick={(e) => {
                      e.stopPropagation() // This is a hacky fix that prevents the items behind this button from receiving a click event: https://github.com/radix-ui/primitives/issues/1658
                      addItem({
                        id: getNanoId(),
                        type: blockTypeValue,
                        value: '',
                        attributes: {
                          ...defaultAttributes.GLOBAL,
                          ...(defaultAttributes?.[blockTypeValue] || {}),
                        },
                      })
                    }}
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
              <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-zinc-100">
                <Settings className="h-4 w-4 text-gray-500" />
              </button>
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
          <DragHandle
            isDragDisabled={isMenuActive}
            className="flex h-6 w-6 items-center justify-center rounded hover:bg-zinc-100"
          />
        </div>
      </div>
      <div className="grow">{children}</div>
    </div>
  )
}

const EditorNavbar = ({ handleDownload, previewSize, setPreviewSize }) => {
  const handleSendEmail = () => {
    console.log('send email')
  }
  return (
    <div className="relative flex h-12 shrink-0 border-b border-zinc-200 bg-white px-8 shadow-sm">
      <div className="absolute inset-x-0 flex h-full items-center justify-center">
        <ToggleGroup.Root
          id="containerAlignField"
          type="single"
          value={previewSize}
          onValueChange={(value) => (value ? setPreviewSize(value) : null)}
          className="flex h-8 rounded-md shadow-sm"
        >
          <ToggleGroup.Item
            value="desktop"
            className="rounded-l-md border border-r-0 border-zinc-300 px-2 text-sm font-semibold text-zinc-500 hover:bg-indigo-50 [&[data-state=on]]:border-indigo-100 [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600"
          >
            Desktop
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="mobile"
            className="rounded-r-md border border-l-0 border-zinc-300 px-2 text-sm font-semibold text-zinc-500 hover:bg-indigo-50 [&[data-state=on]]:border-indigo-100 [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600"
          >
            Mobile
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
      <div className="relative ml-auto flex items-center">
        <button
          className="h-8 cursor-pointer rounded-md bg-indigo-500 px-2 text-sm font-semibold text-white hover:bg-indigo-600"
          onClick={handleDownload}
        >
          Download
        </button>
        <div className="ml-2">
          <Popover.Root>
            <Popover.Trigger
              className="h-8 rounded-md bg-indigo-100 px-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-200 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-indigo-100"
              disabled
            >
              Send Test
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                align="end"
                sideOffset="1"
                className="rounded-md border border-zinc-200 bg-white p-2 shadow-lg"
              >
                <Label.Root
                  // className="mb-1 text-sm font-semibold text-zinc-700"
                  className="sr-only"
                  htmlFor="emailToSendField"
                >
                  Your Email
                </Label.Root>
                <div className="flex items-end">
                  <input
                    id="emailToSendField"
                    type="email"
                    placeholder="Your Email..."
                    className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
                  />
                  <button
                    className="ml-2 h-10 cursor-pointer rounded-md bg-indigo-500 px-4 font-semibold text-white hover:bg-indigo-600"
                    onClick={handleSendEmail}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
    </div>
  )
}
