import { createContext, forwardRef, useContext, useMemo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { defaultDropAnimationSideEffects, DragOverlay } from '@dnd-kit/core'

const SortableItemContext = createContext({
  attributes: {},
  listeners: undefined,
  ref() {},
})

export function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    setActivatorNodeRef,
  } = useSortable({ id })

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  )

  const style = {
    opacity: isDragging ? 0.4 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <SortableItemContext.Provider value={context}>
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
    </SortableItemContext.Provider>
  )
}

export const DragHandle = forwardRef(function DragHandle(
  { isDragDisabled, ...props },
  ref
) {
  const {
    attributes,
    listeners,
    ref: setActivatorNodeRef,
  } = useContext(SortableItemContext)

  return (
    <button
      // {...attributes}
      // {...(isDragDisabled && listeners)}
      ref={ref}
      {...props}
    >
      <GripVertical className="w-4 h-4 text-gray-500" />
    </button>
  )
})

export const SortOverlay = ({ children }) => {
  const dropAnimationConfig = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.4',
        },
      },
    }),
  }

  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
  )
}
