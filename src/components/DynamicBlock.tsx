import { type DefaultFormValues } from '@/pages/templates/[id]'
import { blocks } from '@/utils/defaults'
import { useUpdateBlock } from '@/utils/query/blocks'
import { type BlockType } from '@prisma/client'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

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

  const Component = blocks[type]
  return (
    <Component
      type={type}
      attributes={attributes}
      inputProps={{
        name: `blocks.${index}.value` as 'blocks.0.value',
        control,
      }}
    />
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
