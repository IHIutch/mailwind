import { useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import { X } from 'lucide-react'
import { useRouter } from 'next/router'
import { useFormContext, useWatch } from 'react-hook-form'
import { P, match } from 'ts-pattern'

import {
  setSelectedBlock,
  useSelectedBlockDispatch,
  useSelectedBlockState,
} from '@/context/selectedBlock'
import { type DefaultFormValues } from '@/pages/templates/[id]'
import { useUpdateBlock } from '@/utils/query/blocks'
import { BlockType } from '@prisma/client'
import CodeSidebar from './sidebars/CodeSidebar'
import DividerSidebar from './sidebars/DividerSidebar'
import GlobalSidebar from './sidebars/GlobalSidebar'
import HeadingSidebar from './sidebars/HeadingSidebar'
import ImageSidebar from './sidebars/ImageSidebar'
import TextSidebar from './sidebars/TextSidebar'
import { Button } from './ui/Button'

export default function DynamicSidebar() {
  const {
    query: { id },
  } = useRouter()
  const { mutateAsync: handleUpdateBlock } = useUpdateBlock(Number(id))
  const { data: selectedBlockIndex } = useSelectedBlockState()

  const { control, formState, getValues } = useFormContext<DefaultFormValues>()
  const [didMove, attributes] = useWatch({
    control,
    name: ['didMove', `blocks.${selectedBlockIndex}.attributes`] as [
      'didMove',
      'blocks.0.attributes'
    ],
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const autoSaveDebounce = useCallback(
    debounce(
      ({
        where,
        payload,
        isValid,
      }: {
        where: any
        payload: any
        isValid: boolean
      }) => {
        if (isValid) {
          handleUpdateBlock({
            where,
            payload,
          })
        }
      },
      750
    ),
    []
  )

  useEffect(() => {
    if (typeof selectedBlockIndex === 'number') {
      if (
        !didMove &&
        formState.dirtyFields.blocks?.[selectedBlockIndex]?.attributes
      ) {
        // console.log({
        //   selectedBlockIndex,
        //   dirtyFields: formState.dirtyFields,
        //   id: getValues(`blocks.${selectedBlockIndex}.id`),
        //   errors: formState.errors,
        //   isValid: formState.isValid,
        // })
        autoSaveDebounce({
          where: {
            id: getValues(`blocks.${selectedBlockIndex}.id`),
          },
          payload: {
            attributes,
          },
          isValid: formState.isValid,
        })
      }
    }
  }, [
    attributes,
    autoSaveDebounce,
    didMove,
    formState.isValid,
    formState.dirtyFields,
    getValues,
    selectedBlockIndex,
    formState.errors,
  ])

  const selectedBlockType = selectedBlockIndex
    ? getValues(`blocks.${selectedBlockIndex}.type`)
    : null

  return (
    match(selectedBlockType)
      .with(BlockType.TEXT, () => (
        <TextSidebar closeButton={<SidebarCloseButton />} />
      ))
      .with(P.union(BlockType.H1, BlockType.H2, BlockType.H3), () => (
        <HeadingSidebar closeButton={<SidebarCloseButton />} />
      ))
      .with(BlockType.DIVIDER, () => (
        <DividerSidebar closeButton={<SidebarCloseButton />} />
      ))
      // .with(BlockType.QUOTE, () => (
      //   <QuoteSidebar closeButton={<SidebarCloseButton />} />
      // ))
      .with(BlockType.IMAGE, () => (
        <ImageSidebar closeButton={<SidebarCloseButton />} />
      ))
      .with(BlockType.CODE, () => (
        <CodeSidebar closeButton={<SidebarCloseButton />} />
      ))
      .with(BlockType.BUTTON, () => (
        <TextSidebar closeButton={<SidebarCloseButton />} />
      ))
      .otherwise(() => <GlobalSidebar />)
  )
}

const SidebarCloseButton = () => {
  const dispatch = useSelectedBlockDispatch()

  const handleUnsetActiveBlock = () => {
    dispatch(setSelectedBlock(null))
  }

  return (
    <div className="absolute right-2 top-2">
      <Button
        variant="secondary"
        className="flex h-8 w-8 items-center justify-center p-0"
        onClick={handleUnsetActiveBlock}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
