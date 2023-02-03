import DynamicBlock from '@/components/DynamicBlock'
import DynamicSidebar from '@/components/DynamicSidebar'
import EditorNavbar from '@/components/EditorNavbar'
import GlobalNavbar from '@/components/GlobalNavbar'
import {
  DragHandle,
  SortableItem,
  SortOverlay,
} from '@/components/sortable/SortableItem'
import {
  ActiveBlockProvider,
  setActiveBlock,
  useActiveBlockDispatch,
} from '@/context/activeBlock'
import { SingleBlockPayloadType } from '@/server/routers/blocks'
import { defaultAttributes } from '@/utils/defaults'
import {
  useGetBlocksByTemplateId,
  useReorderMenuItems,
} from '@/utils/query/blocks'
import { useGetTemplateById, useUpdateTemplate } from '@/utils/query/templates'
import {
  type Active,
  type Over,
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
import { BlockType } from '@prisma/client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Dialog from '@radix-ui/react-dialog'
import * as Label from '@radix-ui/react-label'

import clsx from 'clsx'
import {
  Code2,
  FlipVertical,
  PlusCircle,
  PlusSquare,
  Quote,
  Type,
  Image,
  Plus,
  Settings,
  Trash2,
  Copy,
  X,
} from 'lucide-react'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'

export default function TemplateId() {
  const [previewSize, setPreviewSize] = useState<'desktop' | 'mobile'>(
    'desktop'
  )

  const offset = '80px'
  const mobileSize = '480px'
  const global = {
    containerAlign: 'center',
    containerWidth: '600px',
    color: '#000000',
  }

  // const formMethods = useForm({
  //   mode: 'onChange',
  //   defaultValues: {
  //     global: {
  //       containerAlign: 'center',
  //       containerWidth: '600px',
  //       color: '#000000',
  //     },
  //     blocks: loaderBlocks,
  //   },
  // })

  const handleDownload = async () => {
    console.log('download')
    // htmlFetcher.submit(
    //   {
    //     json: JSON.stringify(formData.blocks),
    //   },
    //   { method: 'post', action: '/api/download' }
    // )
  }

  // useEffect(() => {
  //   if (htmlFetcher.data?.html) {
  //     var blob = new Blob([htmlFetcher.data.html], {
  //       type: 'text/html;charset=utf-8',
  //     })
  //     var link = document.createElement('a')
  //     link.href = window.URL.createObjectURL(blob)
  //     link.download = 'email.html'

  //     document.body.appendChild(link)
  //     link.click()

  //     document.body.removeChild(link)
  //   }
  // }, [htmlFetcher.data?.html])

  // const global = useWatch({
  //   name: 'global',
  //   control: formMethods.control,
  // })

  return (
    <>
      <GlobalNavbar>
        <TemplateTitle />
      </GlobalNavbar>
      <ActiveBlockProvider initialValue={{ data: null }}>
        <div className="relative pt-16">
          {/* <FormProvider {...formMethods}> */}
          <div className="fixed inset-y-0 top-16 w-[calc(100%-300px)]">
            <EditorNavbar
              previewSize={previewSize}
              setPreviewSize={setPreviewSize}
              handleDownload={handleDownload}
            />
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
                      ? `calc(${global.containerWidth} + ${offset})`
                      : `calc(${mobileSize} + ${offset})`,
                  left: offset,
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
        {/* </FormProvider> */}
      </ActiveBlockProvider>
    </>
  )
}

const TemplateTitle = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    query: { id },
  } = useRouter()
  const { data: template } = useGetTemplateById(Number(id))
  const { mutateAsync: handleUpdateTemplate, isLoading } = useUpdateTemplate(
    Number(id)
  )

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      title: template?.title || '',
    },
  })

  const onSubmit = async ({ title }: { title: string }) => {
    await handleUpdateTemplate({
      id: Number(id),
      payload: { title },
    })
    setIsOpen(false)
  }

  return (
    <div className="mx-4 flex items-center border-l border-gray-300 px-4">
      <div>
        <p className="font-medium">{template?.title || 'Untitled Template'}</p>
        <div className="text-xs text-neutral-500">
          <span>Last Modified: </span>
          <span>{dayjs(template?.updatedAt).format('MMM D, h:mma')}</span>
        </div>
      </div>
      <div className="ml-4">
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="p-4">
                    <Label.Root
                      htmlFor="template-title"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      Title
                    </Label.Root>
                    <input
                      id="template-title"
                      type="text"
                      className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
                      {...register('title')}
                      placeholder="Untitled Template"
                      aria-describedby={
                        formState.errors.title ? `email-error-message` : ''
                      }
                      aria-invalid={formState.errors.title ? 'true' : 'false'}
                    />
                    {formState.errors.title ? (
                      <p
                        id="email-error-message"
                        className="mt-1 text-xs text-red-500"
                      >
                        {formState.errors.title.message}
                      </p>
                    ) : null}
                  </div>
                  <footer className="flex p-4">
                    <div className="ml-auto">
                      <Dialog.Close className="h-8 rounded border border-zinc-300 px-2 text-sm font-semibold text-zinc-500 hover:bg-indigo-50">
                        Cancel
                      </Dialog.Close>
                      <button
                        disabled={isLoading}
                        type="submit"
                        className="ml-2 h-8 rounded bg-indigo-500 px-2 text-sm font-semibold text-white hover:bg-indigo-600
                        disabled:opacity-40"
                      >
                        Save
                      </button>
                    </div>
                  </footer>
                </form>
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
  const {
    query: { id },
  } = useRouter()
  const { data: blocks } = useGetBlocksByTemplateId(Number(id))
  const { mutateAsync: handleReorderBlocks } = useReorderMenuItems(Number(id))

  const [localBlocks, setLocalBlocks] = useState<SingleBlockPayloadType[]>(
    blocks || []
  )

  const [activeDraggingBlock, setActiveDraggingBlock] =
    useState<SingleBlockPayloadType | null>(null)
  // const { control, getValues, watch } = useFormContext()
  // const { fields, remove, move, insert } = useFieldArray({
  //   keyName: 'uuid', // Prevent overwriting "id" key
  //   control,
  //   name: 'blocks',
  // })

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
    active,
    over,
  }: {
    active: Active
    over: Over | null
  }) => {
    setActiveDraggingBlock(null)

    const oldIndex = localBlocks.findIndex((mb) => mb.id === active.id)
    const newIndex = localBlocks.findIndex((mb) => mb.id === over?.id)

    const reorderedBlocks = arrayMove(localBlocks, oldIndex, newIndex)
    setLocalBlocks(reorderedBlocks)

    const newOrder = reorderedBlocks.map((r, idx) => ({
      id: r.id,
      position: idx,
    }))

    handleReorderBlocks({
      payload: newOrder,
    })
  }

  const handleSetSelectedBlock = (block: SingleBlockPayloadType | null) => {
    // const { id, type } = getValues(`blocks.${itemIndex}`)
    dispatch(setActiveBlock(block))
  }

  const handleDragStart = ({
    active: { data: activeData },
  }: {
    active: Active
  }) => {
    const activeIndex = activeData.current?.sortable?.index || 0
    setActiveDraggingBlock(localBlocks[activeIndex] ?? null)
  }

  const addItem = (idx: number, payload: object) => {
    // Probably can refactor this so object attributes arent "payload" and we can just get the default values based on the block type
    // insert(idx, payload)
    handleSetSelectedBlock(localBlocks[idx] ?? null)
  }

  const duplicateItem = (idx: number) => {
    console.log({ duplicate: idx })
    // const item = getValues(`blocks.${idx}`)
    // insert(idx + 1, {
    //   ...item,
    //   id: nanoid(),
    // })
  }

  const deleteItem = (idx: number) => {
    console.log({ delete: idx })
  }

  return (
    <div>
      <DndContext
        id="dnd"
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => {
          setActiveDraggingBlock(null)
        }}
      >
        <SortableContext
          items={localBlocks}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {localBlocks
              ? localBlocks.map((block, idx) => (
                  <li key={block.id}>
                    <SortableItem id={block.id}>
                      <div
                        className={clsx(
                          'overflow-hidden rounded-lg transition-all',
                          activeDraggingBlock?.id === block.id
                            ? 'ring-2 ring-offset-2'
                            : 'ring-0 ring-offset-0'
                        )}
                      >
                        <ItemBlock
                          block={block}
                          handleAddItem={(payload) => addItem(idx + 1, payload)}
                          handleDeleteItem={() => deleteItem(idx)}
                          handleDuplicateItem={() => duplicateItem(idx)}
                          handleSetSelectedBlock={() =>
                            handleSetSelectedBlock(block)
                          }
                        >
                          {/* <Controller
                        name={`blocks.${idx}.value`}
                        control={control}
                        render={({ field: { value, onChange } }) => ( */}
                          {/* <pre>{JSON.stringify({ block }, null, 2)}</pre> */}
                          <DynamicBlock
                            // id={block.id}
                            attributes={block.attributes}
                            type={block.type}
                            value={block.value ?? ''}
                            onChange={(val) => console.log({ val })}
                          />
                          {/* )}
                      /> */}
                        </ItemBlock>
                      </div>
                    </SortableItem>
                  </li>
                ))
              : null}
          </ul>
        </SortableContext>
        <SortOverlay>
          {activeDraggingBlock ? (
            <ItemBlock>
              <DynamicBlock
                type={activeDraggingBlock.type}
                value={activeDraggingBlock.value || ''}
                attributes={activeDraggingBlock.attributes}
              />
            </ItemBlock>
          ) : null}
        </SortOverlay>
      </DndContext>
    </div>
  )
}

const ItemBlock = ({
  block,
  handleAddItem = () => null,
  handleDeleteItem = () => null,
  handleDuplicateItem = () => null,
  handleSetSelectedBlock = () => null,
  children,
}: {
  block?: object
  handleAddItem?: (v: object) => void
  handleDeleteItem?: () => void
  handleDuplicateItem?: () => void
  handleSetSelectedBlock?: () => void
  children?: ReactNode
}) => {
  const [isActive, setIsActive] = useState(false)
  const [isMenuActive, setIsMenuActive] = useState(false)

  const getIcon = (value: BlockType) => {
    switch (value) {
      case BlockType.TEXT:
        return <Type className="h-4 w-4" />
      case BlockType.DIVIDER:
        return <FlipVertical className="h-4 w-4" />
      case BlockType.CODE:
        return <Code2 className="h-4 w-4" />
      case BlockType.IMAGE:
        return <Image className="h-4 w-4" />
      case BlockType.DIVIDER:
        return <Quote className="h-4 w-4" />
      case BlockType.H1:
        return <PlusCircle className="h-4 w-4" />
      default:
        return <PlusSquare className="h-4 w-4" />
    }
  }

  // const { control, getValues } = useFormContext()
  // const itemType = useWatch({
  //   name: `blocks.${itemIndex}.type`,
  //   control,
  // })

  // const itemPaddingTop = useWatch({
  //   name: `blocks.${itemIndex}.attributes.paddingTop`,
  //   control,
  // })

  return (
    <div
      className="flex"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => {
        !isMenuActive && setIsActive(false)
      }}
      onClick={handleSetSelectedBlock}
    >
      <div
        className={clsx(
          'pr-2'
          // block?.type === BlockType['H1'] ||
          //   block?.type === BlockType['H2'] ||
          //   block?.type === BlockType['H3']
          //   ? 'pt-2'
          //   : 'pt-0'
        )}
      >
        <div
          // style={{ paddingTop: itemPaddingTop }}
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
                      handleAddItem({
                        id: '-1',
                        type: blockTypeValue,
                        value: '',
                        attributes: {
                          ...defaultAttributes.GLOBAL,
                          // ...defaultAttributes.[blockTypeValue], //Need to fix this. Maybe with an enum?
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
                  onClick={handleDuplicateItem}
                >
                  <Copy className="h-4 w-4" />
                  <span className="pl-2">Duplicate Item</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex cursor-pointer items-center py-1 px-2 outline-none hover:bg-zinc-100"
                  onClick={handleDeleteItem}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="pl-2">Delete Item</span>
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
