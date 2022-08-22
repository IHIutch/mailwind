import { createContext, useContext, useMemo, useState } from 'react'
import {
  Box,
  forwardRef,
  Icon,
  IconButton,
  useMergeRefs,
} from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import {
  defaultDropAnimationSideEffects,
  DragOverlay,
  useDndContext,
  useDndMonitor,
} from '@dnd-kit/core'

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
      <Box ref={setNodeRef} style={style}>
        {children}
      </Box>
    </SortableItemContext.Provider>
  )
}

export const DragHandle = forwardRef((props, ref) => {
  const {
    attributes,
    listeners,
    ref: innerRef,
  } = useContext(SortableItemContext)
  const refs = useMergeRefs(innerRef, ref)

  return (
    <IconButton
      size="xs"
      variant="ghost"
      icon={<Icon color="gray.500" boxSize="3.5" as={GripVertical} />}
      {...attributes}
      {...(props.isDragDisabled ? {} : listeners)}
      ref={refs}
      {...props}
    />
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
