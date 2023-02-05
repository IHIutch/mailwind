import { sidebars } from '@/utils/defaults'
import { X } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import debounce from 'lodash/debounce'
import { useRouter } from 'next/router'
import { useUpdateBlock } from '@/utils/query/blocks'
import {
  setSelectedBlock,
  useSelectedBlockDispatch,
  useSelectedBlockState,
} from '@/context/selectedBlock'
import { SingleBlockPayloadType } from '@/utils/prisma/blocks'

type FormValues = {
  blocks: SingleBlockPayloadType[]
  global: any
}

export default function DynamicSidebar() {
  const {
    query: { id },
  } = useRouter()
  const { data: selectedBlockIndex } = useSelectedBlockState()
  const dispatch = useSelectedBlockDispatch()

  const { mutateAsync: handleUpdateBlock } = useUpdateBlock(Number(id))
  const { control, formState, getValues } = useFormContext<FormValues>()

  const attributes = useWatch({
    control,
    name: `blocks.${selectedBlockIndex}.attributes` as 'blocks.0.attributes',
  })

  const selectedBlockValues = getValues('blocks')?.[selectedBlockIndex || -1]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const autoSaveDebounce = useCallback(
    debounce(
      ({
        id,
        attributes,
        isValid,
      }: {
        id: any
        attributes: any
        isValid: boolean
      }) => {
        if (isValid) {
          handleUpdateBlock({
            where: { id },
            payload: { attributes },
          })
        }
      },
      750
    ),
    []
  )

  useEffect(() => {
    if (formState.isDirty && selectedBlockIndex) {
      autoSaveDebounce({
        id: selectedBlockValues?.id,
        attributes,
        isValid: formState.isValid,
      })
    }
  }, [
    selectedBlockIndex,
    attributes,
    autoSaveDebounce,
    formState.isDirty,
    formState.isValid,
    selectedBlockValues?.id,
  ])

  const handleUnsetActiveBlock = () => {
    dispatch(setSelectedBlock(null))
  }

  const Component = sidebars[selectedBlockValues?.type || 'GLOBAL']
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
              {selectedBlockValues?.type || 'Global Attributes'}
            </h2>
          </div>
          {/* {activeBlock ? JSON.stringify(activeBlock, null, 2) : null} */}
        </div>
      </div>
    </Component>
  )
}
