import { sidebars } from '@/utils/defaults'
import { X } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  setSelectedBlock,
  useSelectedBlockDispatch,
  useSelectedBlockState,
} from '@/context/selectedBlock'
import { DefaultFormValues } from '@/pages/templates/[id]'
import { useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import { useUpdateBlock } from '@/utils/query/blocks'
import { useRouter } from 'next/router'

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
    <Component key={selectedBlockIndex}>
      <div className="relative">
        {selectedBlockIndex ? (
          <button
            className="absolute right-2 flex h-8 w-8 items-center justify-center rounded bg-zinc-200 hover:bg-zinc-300"
            onClick={handleUnsetActiveBlock}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
        <div>
          <div className="mb-4 px-3">
            <h2 className="font-semibold">
              {selectedBlockType || 'Global Attributes'}
            </h2>
          </div>
        </div>
      </div>
    </Component>
  )
}
