import { sidebars } from '@/utils/defaults'
import { X } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import {
  setSelectedBlock,
  useSelectedBlockDispatch,
  useSelectedBlockState,
} from '@/context/selectedBlock'
import { DefaultFormValues } from '@/pages/templates/[id]'

export default function DynamicSidebar() {
  const { data: selectedBlockIndex } = useSelectedBlockState()
  const dispatch = useSelectedBlockDispatch()

  const { getValues } = useFormContext<DefaultFormValues>()

  const selectedBlockValues = selectedBlockIndex
    ? getValues(`blocks.${selectedBlockIndex}`)
    : null

  const handleUnsetActiveBlock = () => {
    dispatch(setSelectedBlock(-1))
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
        </div>
      </div>
    </Component>
  )
}
