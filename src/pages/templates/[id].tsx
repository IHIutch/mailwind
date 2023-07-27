import { useEffect, useMemo, useState, type ReactNode } from 'react'
import dayjs from 'dayjs'
import {
  Code2,
  Copy,
  FlipVertical,
  GripVertical,
  ImageIcon,
  Plus,
  PlusCircle,
  PlusSquare,
  Quote,
  Settings,
  Trash2,
  Type,
} from 'lucide-react'
import { useRouter } from 'next/router'
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
  type DropResult,
} from 'react-beautiful-dnd'
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form'
import axios from 'redaxios'
import { match } from 'ts-pattern'

import DynamicBlock from '@/components/DynamicBlock'
import DynamicSidebar from '@/components/DynamicSidebar'
import EditorNavbar from '@/components/EditorNavbar'
import GlobalNavbar from '@/components/GlobalNavbar'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import {
  SelectedBlockProvider,
  setSelectedBlock,
  useSelectedBlockDispatch,
  useSelectedBlockState,
} from '@/context/selectedBlock'
import { getDefaultAttributes } from '@/utils/defaults'
import { cn, getNewLexoPosition } from '@/utils/functions'
import { type SingleBlockPayloadType } from '@/utils/prisma/blocks'
import {
  useCreateBlock,
  useDeleteBlock,
  useGetBlocksByTemplateId,
  useUpdateBlock,
} from '@/utils/query/blocks'
import { useGetTemplateById, useUpdateTemplate } from '@/utils/query/templates'
import { BlockType } from '@prisma/client'

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

  const [previewSize, setPreviewSize] = useState<'desktop' | 'mobile'>(
    'desktop'
  )

  const offset = '92px'
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
    formMethods.reset({
      global: { ...formMethods.getValues('global') },
      blocks: sortedBlocks,
      didMove: false,
    })
  }, [formMethods.reset, sortedBlocks, formMethods.getValues, formMethods])

  const handleDownload = async () => {
    const {
      data: { html },
    } = await axios
      .post(`/api/download`, { json: sortedBlocks })
      .catch((res) => {
        throw new Error(res.data.error)
      })

    const blob = new Blob([html], {
      type: 'text/html;charset=utf-8',
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'email.html'

    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
  }

  return (
    <>
      <GlobalNavbar>
        <TemplateTitle />
      </GlobalNavbar>
      <SelectedBlockProvider>
        <FormProvider {...formMethods}>
          <div className="relative pt-16">
            <div className="fixed inset-y-0 w-[calc(100%-300px)] pt-16">
              <EditorNavbar
                previewSize={previewSize}
                setPreviewSize={setPreviewSize}
                handleDownload={handleDownload}
              />
              <div className="relative h-full pt-12">
                <div className="h-full overflow-y-auto">
                  <div
                    className={cn('relative px-4 py-12', [
                      global.containerAlign === 'left' ? 'mr-auto' : '',
                      global.containerAlign === 'center' ? 'mx-auto' : '',
                      global.containerAlign === 'right' ? 'ml-auto' : '',
                    ])}
                    style={{
                      width:
                        previewSize === 'desktop'
                          ? `calc(${global.containerWidth} + ${offset})`
                          : `calc(${mobileSize} + ${offset})`,
                      left: `calc(${offset} / 2 * -1)`,
                    }}
                  >
                    <EditView />
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-y-0 right-0 w-[300px] border-l border-zinc-200 bg-white pt-16">
              <div className="h-full overflow-y-auto">
                <DynamicSidebar />
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
          <span>Last Updated: </span>
          <span>{dayjs(template?.fullUpdatedAt).format('MMM D, h:mma')}</span>
        </div>
      </div>
      <div className="ml-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="flex h-8 w-8 items-center justify-center p-0"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Edit Template Title
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="py-4">
                <Label
                  htmlFor="template-title"
                  className="mb-1 block text-sm font-semibold text-gray-700"
                >
                  Title
                </Label>
                <Input
                  id="template-title"
                  type="text"
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
              <DialogFooter>
                <div className="ml-auto">
                  <Button variant="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button disabled={isLoading} type="submit" className="ml-2">
                    Save
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

const EditView = () => {
  const { data: selectedBlockIndex } = useSelectedBlockState()
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
          ...getDefaultAttributes('GLOBAL'),
          ...getDefaultAttributes(type),
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
                      <div
                        ref={drag.innerRef}
                        {...drag.draggableProps}
                        className={cn(
                          selectedBlockIndex === idx ? 'relative z-10' : ''
                        )}
                      >
                        <div
                          className={cn(
                            'transition-all',
                            snapshot.isDragging ? 'opacity-60' : 'opacity-100'
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
                            dragHandle={
                              <div {...drag.dragHandleProps}>
                                <GripVertical className="h-4 w-4 text-gray-500" />
                              </div>
                            }
                          >
                            <div
                              className={cn(
                                '-m-1 rounded p-1',
                                selectedBlockIndex === idx
                                  ? 'ring-4 ring-indigo-600'
                                  : 'ring-0'
                              )}
                            >
                              <DynamicBlock
                                index={idx}
                                type={getValues(`blocks.${idx}.type`)}
                                attributes={watch(`blocks.${idx}.attributes`)}
                              />
                            </div>
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
  dragHandle,
  children,
}: {
  type?: BlockType
  handleAddItem?: ({ type }: { type: BlockType }) => void
  handleDeleteItem?: () => void
  handleDuplicateItem?: () => void
  handleSetSelectedBlock?: () => void
  dragHandle: ReactNode
  children?: ReactNode
}) => {
  const [isActive, setIsActive] = useState(false)
  const [isMenuActive, setIsMenuActive] = useState(false)

  const getIcon = (value: BlockType) => {
    return (
      match(value)
        .with(BlockType.TEXT, () => <Type className="h-4 w-4" />)
        .with(BlockType.DIVIDER, () => <FlipVertical className="h-4 w-4" />)
        .with(BlockType.CODE, () => <Code2 className="h-4 w-4" />)
        .with(BlockType.IMAGE, () => <ImageIcon className="h-4 w-4" />)
        // .with(BlockType.QUOTE, () => <Quote className="h-4 w-4" />)
        .with(BlockType.H1, () => <PlusCircle className="h-4 w-4" />)
        .with(BlockType.H2, () => <PlusCircle className="h-4 w-4" />)
        .with(BlockType.H3, () => <PlusCircle className="h-4 w-4" />)
        .with(BlockType.BUTTON, () => <PlusSquare className="h-4 w-4" />)
        .exhaustive()
    )
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
        className={cn(
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
          className={cn(
            'flex transition-all',
            isActive ? 'visible opacity-100' : 'invisible opacity-0'
          )}
        >
          <DropdownMenu onOpenChange={setIsMenuActive}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-7 w-7 items-center justify-center p-0"
              >
                <Plus className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(BlockType).map(([key, type], idx) => (
                <DropdownMenuItem
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation() // This is a hacky fix that prevents the items behind this button from receiving a click event: https://github.com/radix-ui/primitives/issues/1658
                    handleAddItem({ type: type })
                  }}
                >
                  {getIcon(type)}
                  <p className="pl-2">{key}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu onOpenChange={setIsMenuActive}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-7 w-7 items-center justify-center p-0"
              >
                <Settings className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleDuplicateItem}>
                <Copy className="h-4 w-4" />
                <span className="pl-2">Duplicate Item</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeleteItem}>
                <Trash2 className="h-4 w-4" />
                <span className="pl-2">Delete Item</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-zinc-100">
            {dragHandle}
          </div>
        </div>
      </div>
      <div className="grow">{children}</div>
    </div>
  )
}
