import { X } from 'lucide-react'
import {
  setActiveBlock,
  useActiveBlockDispatch,
  useActiveBlockState,
} from '~/context/activeBlock'
import { sidebars } from '~/utils/types'

export default function DynamicSidebar() {
  const { data: activeBlock } = useActiveBlockState()

  const Component = sidebars[activeBlock?.type || 'global']
  return <Component heading={<Heading />} />
}

const Heading = () => {
  const { data: activeBlock } = useActiveBlockState()
  const dispatch = useActiveBlockDispatch()

  const handleUnsetActiveBlock = () => {
    dispatch(setActiveBlock(null))
  }
  return (
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
            {activeBlock?.type || 'Global Attributes'}
          </h2>
        </div>
        {activeBlock ? JSON.stringify(activeBlock, null, 2) : null}
      </div>
    </div>
  )
}
