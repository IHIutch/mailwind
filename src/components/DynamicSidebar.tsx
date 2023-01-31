import {
  setActiveBlock,
  useActiveBlockDispatch,
  useActiveBlockState,
} from '@/context/activeBlock'
import { sidebars } from '@/utils/defaults'
import { X } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import debounce from 'lodash/debounce'
import { useRouter } from 'next/router'
import { useUpdateBlock } from '@/utils/query/blocks'

export default function DynamicSidebar() {
  const { data: activeBlock } = useActiveBlockState()
  const dispatch = useActiveBlockDispatch()

  const handleUnsetActiveBlock = () => {
    dispatch(setActiveBlock(null))
  }

  const {
    query: { id },
  } = useRouter()
  const updateBlock = useUpdateBlock(Number(id))

  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      ...activeBlock,
    },
    values: {
      ...activeBlock,
    },
  })

  const attributes = useWatch({
    control: formMethods.control,
    name: 'attributes',
  })

  const autoSaveDebounce = useMemo(
    () =>
      debounce(({ id, payload }: { id: number; payload: any }) => {
        updateBlock.mutateAsync({
          id,
          payload,
        })
      }, 750),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (
      formMethods.formState.isDirty &&
      formMethods.formState.isValid &&
      activeBlock?.id
    ) {
      autoSaveDebounce({ id: activeBlock?.id, payload: { attributes } })
    }
  }, [
    activeBlock?.id,
    attributes,
    autoSaveDebounce,
    formMethods.formState.isValid,
    formMethods.formState.isDirty,
  ])

  const Component = sidebars[activeBlock?.type ?? 'GLOBAL']
  return (
    <FormProvider {...formMethods}>
      <Component key={activeBlock?.id}>
        <div className="relative">
          {activeBlock ? (
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
                {activeBlock?.type ?? 'Global Attributes'}
              </h2>
            </div>
            {/* {activeBlock ? JSON.stringify(activeBlock, null, 2) : null} */}
          </div>
        </div>
      </Component>
    </FormProvider>
  )
}
