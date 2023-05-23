import { useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import { X } from 'lucide-react'
import { useRouter } from 'next/router'
import { useFormContext, useWatch } from 'react-hook-form'

import {
  setSelectedBlock,
  useSelectedBlockDispatch,
  useSelectedBlockState,
} from '@/context/selectedBlock'
import { type DefaultFormValues } from '@/pages/templates/[id]'
import { sidebars } from '@/utils/defaults'
import { useUpdateBlock } from '@/utils/query/blocks'
import { Button } from './ui/Button'

export default function DynamicSidebar() {
  const {
    query: { id },
  } = useRouter()
  const { mutateAsync: handleUpdateBlock } = useUpdateBlock(Number(id))
  const { data: selectedBlockIndex } = useSelectedBlockState()
  const dispatch = useSelectedBlockDispatch()

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
    if (
      !didMove &&
      formState.dirtyFields.blocks?.[selectedBlockIndex]?.attributes
    ) {
      // console.log(index, formState.dirtyFields, value)
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
  }, [
    attributes,
    autoSaveDebounce,
    didMove,
    formState.isValid,
    formState.dirtyFields,
    getValues,
    selectedBlockIndex,
  ])

  const handleUnsetActiveBlock = () => {
    dispatch(setSelectedBlock(-1))
  }

  const selectedBlockType = getValues(`blocks.${selectedBlockIndex}.type`)
  const Component = sidebars[selectedBlockType || 'GLOBAL']
  return (
    <Component
      key={selectedBlockIndex}
      className="py-4"
      closeButton={
        selectedBlockIndex !== -1 ? (
          <div className="absolute right-2 top-2">
            <Button
              variant="secondary"
              className="flex h-8 w-8 items-center justify-center p-0"
              onClick={handleUnsetActiveBlock}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : null
      }
    />
  )
}
