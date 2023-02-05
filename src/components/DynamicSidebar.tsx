import { sidebars } from '@/utils/defaults'
import { X } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import debounce from 'lodash/debounce'
import { useRouter } from 'next/router'
import { useGetBlocksByTemplateId, useUpdateBlock } from '@/utils/query/blocks'
import {
  setSelectedBlock,
  useSelectedBlockDispatch,
  useSelectedBlockState,
} from '@/context/selectedBlock'

export default function DynamicSidebar() {
  const {
    query: { id },
  } = useRouter()
  const { data: selectedBlockId } = useSelectedBlockState()
  const dispatch = useSelectedBlockDispatch()

  const { data: blocks } = useGetBlocksByTemplateId(Number(id))
  const selectedBlock = (blocks || []).find((b) => b.id === selectedBlockId)

  const handleUnsetActiveBlock = () => {
    dispatch(setSelectedBlock(null))
  }

  const { mutateAsync: handleUpdateBlock } = useUpdateBlock(Number(id))

  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      ...selectedBlock,
    },
    values: {
      ...selectedBlock,
    },
  })

  const attributes = useWatch({
    control: formMethods.control,
    name: 'attributes',
  })

  const autoSaveDebounce = useMemo(
    () =>
      debounce((payload: any) => {
        if (formMethods.formState.isValid) {
          handleUpdateBlock({
            where: { id: Number(selectedBlockId) },
            payload,
          })
        }
      }, 750),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (formMethods.formState.isDirty && selectedBlockId) {
      autoSaveDebounce(attributes)
    }
  }, [
    selectedBlockId,
    attributes,
    autoSaveDebounce,
    formMethods.formState.isDirty,
  ])

  const Component = sidebars[selectedBlock?.type ?? 'GLOBAL']
  return (
    <FormProvider {...formMethods}>
      <Component key={selectedBlockId}>
        <div className="relative">
          {selectedBlock ? (
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
                {selectedBlock?.type ?? 'Global Attributes'}
              </h2>
            </div>
            {/* {activeBlock ? JSON.stringify(activeBlock, null, 2) : null} */}
          </div>
        </div>
      </Component>
    </FormProvider>
  )
}
