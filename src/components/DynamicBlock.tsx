import { useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import { useFormContext, useWatch } from 'react-hook-form'
import { P, match } from 'ts-pattern'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import { useUpdateBlock } from '@/utils/query/blocks'
import { BlockType } from '@prisma/client'
import ButtonBlock from './blocks/ButtonBlock'
import CodeBlock from './blocks/CodeBlock'
import DividerBlock from './blocks/DividerBlock'
import HeadingBlock from './blocks/HeadingBlock'
import ImageBlock from './blocks/ImageBlock'
import QuoteBlock from './blocks/QuoteBlock'
import TextBlock from './blocks/TextBlock'

export default function DynamicBlock({
  index,
  type,
  attributes,
}: {
  index: number
  type: BlockType
  attributes: any
}) {
  const {
    query: { id },
  } = useRouter()
  const { mutateAsync: handleUpdateBlock } = useUpdateBlock(Number(id))

  const { control, formState, getValues } = useFormContext<DefaultFormValues>()
  const [didMove, value] = useWatch({
    control,
    name: ['didMove', `blocks.${index}.value`] as ['didMove', 'blocks.0.value'],
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
    if (!didMove && formState.dirtyFields.blocks?.[index]?.value) {
      // console.log(index, formState.dirtyFields, value)
      autoSaveDebounce({
        where: {
          id: getValues(`blocks.${index}.id`),
        },
        payload: {
          value,
        },
        isValid: formState.isValid,
      })
    }
  }, [
    ,
    autoSaveDebounce,
    didMove,
    formState.isValid,
    formState.dirtyFields,
    getValues,
    index,
    value,
  ])

  return (
    match(type)
      .with(BlockType.TEXT, () => (
        <TextBlock
          attributes={attributes}
          inputProps={{
            name: `blocks.${index}.value` as 'blocks.0.value',
            control,
          }}
        />
      ))
      .with(BlockType.BUTTON, () => (
        <ButtonBlock
          attributes={attributes}
          inputProps={{
            name: `blocks.${index}.value` as 'blocks.0.value',
            control,
          }}
        />
      ))
      .with(P.union(BlockType.H1, BlockType.H2, BlockType.H3), (type) => (
        <HeadingBlock
          type={type}
          attributes={attributes}
          inputProps={{
            name: `blocks.${index}.value` as 'blocks.0.value',
            control,
          }}
        />
      ))
      .with(BlockType.DIVIDER, () => <DividerBlock attributes={attributes} />)
      // .with(BlockType.QUOTE, () => (
      //   <QuoteBlock
      //     attributes={attributes}
      //     inputProps={{
      //       name: `blocks.${index}.value` as 'blocks.0.value',
      //       control,
      //     }}
      //   />
      // ))
      .with(BlockType.IMAGE, () => <ImageBlock attributes={attributes} />)
      .with(BlockType.CODE, () => (
        <CodeBlock
          attributes={attributes}
          inputProps={{
            name: `blocks.${index}.value` as 'blocks.0.value',
            control,
          }}
        />
      ))
      .exhaustive()
  )
}

// function keyDownHandler(event) {
//   if (event.key === 'ArrowUp') {
//     if (menu.value?.open) {
//       event.preventDefault()
//     }
//     // If at first line, move to previous block
//     else if (atFirstLine()) {
//       event.preventDefault()
//       // emit('moveToPrevLine')
//     }
//   } else if (event.key === 'ArrowDown') {
//     if (menu.value?.open) {
//       event.preventDefault()
//     }
//     // If at last line, move to next block
//     else if (atLastLine()) {
//       event.preventDefault()
//       // emit('moveToNextLine')
//     }
//   } else if (event.key === 'ArrowLeft') {
//     // If at first character, move to previous block
//     if (atFirstChar()) {
//       event.preventDefault()
//       // emit('moveToPrevChar')
//     }
//   } else if (event.key === 'ArrowRight') {
//     // If at last character, move to next block
//     if (atLastChar()) {
//       event.preventDefault()
//       // emit('moveToNextChar')
//     }
//   } else if (event.key === 'Backspace' && highlightedLength() === 0) {
//     if (!(menu.value && menu.value.open) && atFirstChar()) {
//       event.preventDefault()
//       // emit('merge')
//     }
//   } else if (event.key === 'Enter') {
//     event.preventDefault()
//     if (!(menu.value && menu.value.open)) {
//       // emit('split')
//     }
//   }
// }
