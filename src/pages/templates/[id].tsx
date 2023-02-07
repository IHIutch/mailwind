import DynamicBlock from '@/components/DynamicBlock'
import DynamicSidebar from '@/components/DynamicSidebar'
import EditorNavbar from '@/components/EditorNavbar'
import GlobalNavbar from '@/components/GlobalNavbar'
import { defaultAttributes } from '@/utils/defaults'
import {
  useCreateBlock,
  useDeleteBlock,
  useGetBlocksByTemplateId,
  useUpdateBlock,
} from '@/utils/query/blocks'
import { useGetTemplateById, useUpdateTemplate } from '@/utils/query/templates'
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
import { type ReactNode, useEffect, useMemo, useCallback } from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import {
  SelectedBlockProvider,
  setSelectedBlock,
  useSelectedBlockDispatch,
  useSelectedBlockState,
} from '@/context/selectedBlock'
import { getNewLexoPosition } from '@/utils/functions'
import { SingleBlockPayloadType } from '@/utils/prisma/blocks'
import { debounce } from 'lodash'
import {
  DragDropContext,
  Draggable,
  DragStart,
  Droppable,
  DropResult,
  resetServerContext,
} from 'react-beautiful-dnd'

export type DefaultFormValues = {
  didMove: boolean
  blocks: SingleBlockPayloadType[]
  global: {
    // containerAlign: 'left' | 'center' | 'right'
    containerAlign: string
    containerWidth: string
    backgroundColor: string
  }
}

export default function TemplateId() {
  const {
    query: { id },
  } = useRouter()

  const { data: blocks } = useGetBlocksByTemplateId(Number(id))
  const sortedBlocks = useMemo(() => {
    return blocks
      ? blocks.sort((a, b) => a.position.localeCompare(b.position))
      : []
  }, [blocks])

  const { data: selectedBlockIndex } = useSelectedBlockState()
  const [previewSize, setPreviewSize] = useState<'desktop' | 'mobile'>(
    'desktop'
  )

  const offset = '80px'
  const mobileSize = '480px'
  const global = {
    containerAlign: 'center',
    containerWidth: '600px',
    backgroundColor: '#ffffff',
  }

  const formMethods = useForm<DefaultFormValues>({
    mode: 'onChange',
    defaultValues: {
      didMove: false,
      global,
      blocks: sortedBlocks,
    },
  })

  useEffect(() => {
    console.log('reset')
    formMethods.reset({
      global: { ...formMethods.getValues('global') },
      blocks: sortedBlocks,
      didMove: false,
    })
  }, [formMethods.reset, sortedBlocks, formMethods.getValues, formMethods])

  const handleDownload = async () => {
    console.log('download')
    // htmlFetcher.submit(
    //   {
    //     json: JSON.stringify(formData.blocks),
    //   },
    //   { method: 'post', action: '/api/download' }
    // )
  }

  // const global = useWatch({
  //   name: 'global',
  //   control: formMethods.control,
  // })

  return (
    <>
      <GlobalNavbar>
        <TemplateTitle />
      </GlobalNavbar>
      <SelectedBlockProvider initialValue={{ data: -1 }}>
        <FormProvider {...formMethods}>
          <div className="relative pt-16">
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
        </FormProvider>
      </SelectedBlockProvider>
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
      where: { id: Number(id) },
      payload: { title },
    })
    setIsOpen(false)
  }

  resetServerContext()

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
  const dispatch = useSelectedBlockDispatch()
  const {
    query: { id },
  } = useRouter()
  const { mutateAsync: handleUpdateBlock } = useUpdateBlock(Number(id))
  const { mutateAsync: handleCreateBlock } = useCreateBlock(Number(id))
  const { mutateAsync: handleDeleteBlock } = useDeleteBlock(Number(id))

  const { control, setValue, getValues, watch } =
    useFormContext<DefaultFormValues>()
  const { fields, move } = useFieldArray({
    keyName: 'uuid', // Prevent overwriting "id" key
    name: 'blocks',
    control,
  })

  const handleDragEnd = ({ source, destination }: DropResult) => {
    const activeIndex = source.index
    const overIndex = destination?.index

    if (overIndex !== undefined) {
      const offset = activeIndex > overIndex ? -1 : 1
      const start = fields[Math.min(overIndex, overIndex + offset)]
      const end = fields[Math.max(overIndex, overIndex + offset)]

      const position = getNewLexoPosition(start?.position, end?.position)

      handleUpdateBlock({
        where: { id: getValues(`blocks.${activeIndex}.id`) },
        payload: {
          position,
        },
      })

      setValue('didMove', true)
      move(activeIndex, overIndex)
      dispatch(setSelectedBlock(overIndex))
    }
  }

  // const handleDragStart = ({ active }: { active: Active }) => {
  //   const activeIndex = fields.findIndex((i) => i.id === active.id)
  // }

  const addItem = ({ idx, type }: { idx: number; type: BlockType }) => {
    // Probably can refactor this so object attributes arent "payload" and we can just get the default values based on the block type
    // insert(idx, payload)

    const start = fields[idx]
    const end = fields[idx + 1]
    const position = getNewLexoPosition(start?.position, end?.position)

    handleCreateBlock({
      payload: {
        templateId: Number(id),
        value: '',
        position,
        type,
        attributes: {
          ...defaultAttributes['GLOBAL'],
          ...defaultAttributes[type],
        },
      },
    })
  }

  const duplicateItem = (idx: number) => {
    const start = fields[idx]
    const end = fields[idx + 1]
    const position = getNewLexoPosition(start?.position, end?.position)

    handleCreateBlock({
      payload: {
        type: getValues(`blocks.${idx}.type`),
        templateId: Number(id),
        value: getValues(`blocks.${idx}.value`) || '',
        attributes: getValues(`blocks.${idx}.attributes`),
        position,
      },
    })
  }

  const deleteItem = (blockId: number) => {
    handleDeleteBlock({ where: { id: Number(blockId) } })
  }

  return (
    <div>
      {fields.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(drop) => (
              <div ref={drop.innerRef} {...drop.droppableProps}>
                {fields.map((block, idx) => (
                  <Draggable
                    draggableId={(block?.id || '-1').toString()}
                    key={(block?.id || '-1').toString()}
                    index={idx}
                  >
                    {(drag, snapshot) => (
                      <div ref={drag.innerRef} {...drag.draggableProps}>
                        <div {...drag.dragHandleProps}>{idx}</div>
                        <div
                          className={clsx(
                            'overflow-hidden rounded-lg transition-all',
                            snapshot.isDragging
                              ? 'ring-2 ring-offset-2'
                              : 'ring-0 ring-offset-0'
                          )}
                        >
                          <ItemBlock
                            key={(block?.id || '-1').toString()}
                            type={block.type}
                            handleAddItem={({ type }) => addItem({ idx, type })}
                            handleDeleteItem={() => deleteItem(block.id)}
                            handleDuplicateItem={() => duplicateItem(idx)}
                            handleSetSelectedBlock={() =>
                              dispatch(setSelectedBlock(idx))
                            }
                          >
                            <DynamicBlock
                              index={idx}
                              type={getValues(`blocks.${idx}.type`)}
                              attributes={watch(`blocks.${idx}.attributes`)}
                            />
                          </ItemBlock>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                <div>{drop.placeholder}</div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : null}
    </div>
  )
}

const ItemBlock = ({
  type,
  handleAddItem = () => null,
  handleDeleteItem = () => null,
  handleDuplicateItem = () => null,
  handleSetSelectedBlock = () => null,
  children,
}: {
  type?: BlockType
  handleAddItem?: ({ type }: { type: BlockType }) => void
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
          'pr-2',
          type === BlockType['H1'] ||
            type === BlockType['H2'] ||
            type === BlockType['H3']
            ? 'pt-2'
            : 'pt-0'
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
                {Object.entries(BlockType).map(([key, optionType], idx) => (
                  <DropdownMenu.Item
                    key={idx}
                    className="flex cursor-pointer items-center py-1 px-2 outline-none hover:bg-zinc-100"
                    onClick={(e) => {
                      e.stopPropagation() // This is a hacky fix that prevents the items behind this button from receiving a click event: https://github.com/radix-ui/primitives/issues/1658
                      handleAddItem({ type: optionType })
                    }}
                  >
                    {getIcon(optionType)}
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
        </div>
      </div>
      <div className="grow">{children}</div>
    </div>
  )
}
