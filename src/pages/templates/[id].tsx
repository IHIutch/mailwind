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
import { defaultAttributes } from '@/utils/defaults'
import { trpc } from '@/utils/trpc'
import {
  Active,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  Over,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { BlockType } from '@prisma/client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
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
} from 'lucide-react'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

export default function TemplateId() {
  const [previewSize, setPreviewSize] = useState('desktop')

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
      <GlobalNavbar />
      <ActiveBlockProvider>
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

const EditView = () => {
  const {
    query: { id },
  } = useRouter()
  const { data: blocks } = trpc.block.byTemplateId.useQuery({
    templateId: Number(id),
  })

  const dispatch = useActiveBlockDispatch()

  const memoizedBlocks = useMemo(() => {
    return blocks || []
  }, [blocks])
  // const dispatch = useActiveBlockDispatch()
  const [activeDraggingBlock, setActiveDraggingBlock] = useState<
    (typeof memoizedBlocks)[number] | null
  >(null)
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
    const activeIdx = active.data?.current?.sortable?.index
    const overIdx = over?.data?.current?.sortable?.index
    // if (overIdx && activeIdx !== overIdx) {
    //   move(activeIdx, overIdx)
    // }
    setActiveDraggingBlock(null)
  }

  const handleSetSelectedBlock = (
    block: (typeof memoizedBlocks)[number] | null
  ) => {
    // const { id, type } = getValues(`blocks.${itemIndex}`)
    dispatch(setActiveBlock(block))
  }

  const handleDragStart = ({
    active: { data: activeData },
  }: {
    active: Active
  }) => {
    const activeIndex = activeData.current?.sortable?.index || 0
    setActiveDraggingBlock(memoizedBlocks[activeIndex] ?? null)
  }

  const addItem = (idx: number, payload: object) => {
    // Probably can refactor this so object attributes arent "payload" and we can just get the default values based on the block type
    // insert(idx, payload)
    handleSetSelectedBlock(memoizedBlocks[idx] ?? null)
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
          items={memoizedBlocks}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {memoizedBlocks
              ? memoizedBlocks.map((block, idx) => (
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
