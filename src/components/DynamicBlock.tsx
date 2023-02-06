import { useSelectedBlockState } from '@/context/selectedBlock'
import { blocks } from '@/utils/defaults'
import { SingleBlockPayloadType } from '@/utils/prisma/blocks'
import { useUpdateBlock } from '@/utils/query/blocks'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

type FormValues = {
  blocks: SingleBlockPayloadType[]
  global: any
}

export default function DynamicBlock({ index }: { index: number }) {
  const {
    query: { id },
  } = useRouter()
  const { mutateAsync: handleUpdateBlock } = useUpdateBlock(Number(id))
  const { control, getValues, formState } = useFormContext<FormValues>()

  const [attributes, value] = useWatch({
    control,
    name: [`blocks.${index}.attributes`, `blocks.${index}.value`] as [
      'blocks.0.attributes',
      'blocks.0.value'
    ],
  })
  const currentBlock = getValues(`blocks.${index}`)
  const isValueDirty = formState.dirtyFields.blocks?.[index]?.value

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const autoSaveDebounce = useCallback(
    debounce(
      ({
        id,
        value,
        isValid,
      }: {
        id: any
        value: string
        isValid: boolean
      }) => {
        if (isValid) {
          handleUpdateBlock({
            where: { id },
            payload: { value },
          })
        }
      },
      750
    ),
    []
  )

  useEffect(() => {
    if (isValueDirty) {
      autoSaveDebounce({
        id: currentBlock?.id,
        value: value || '',
        isValid: formState.isValid,
      })
    }
  }, [
    autoSaveDebounce,
    currentBlock?.id,
    formState.isValid,
    isValueDirty,
    value,
  ])

  const Component = blocks[currentBlock.type]
  return (
    <Component
      type={currentBlock.type}
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
