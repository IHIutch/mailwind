import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react'
import {
  setActiveElement,
  useActiveElementDispatch,
  useActiveElementState,
} from 'context/activeElement'
import { useLiveQuery } from 'dexie-react-hooks'
import { GripVertical, Plus } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useHydrated } from 'remix-utils'
import { getComponentAllowedChildren, getComponentTitle } from 'utils/functions'
import { db } from '~/models/db'

export default function ComponentList() {
  const isHydrated = useHydrated()

  const bodyComps = useLiveQuery(
    () => (isHydrated ? db.body.toArray() : []),
    [isHydrated]
  )

  const memoBodyComps = useMemo(() => bodyComps || [], [bodyComps])

  const getNestedElements = (list, parent) =>
    list
      .filter((li) => li.parentId === parent.id)
      .map((li) => ({
        ...li,
        children: getNestedElements(list, li),
      }))

  const nestedElements = memoBodyComps
    .filter((el) => el.parentId === -1)
    .map((el) => {
      return {
        ...el,
        children: getNestedElements(memoBodyComps, el),
      }
    })

  console.log({ nestedElements })

  const handleUpdateBodyComponent = (id, payload) => {
    db.body.update(id, {
      ...payload,
    })
  }

  const handleDragEnd = (result) => {
    const { source, destination, draggableId, type } = result
    if (!destination) return // dropped outside the list

    const id = parseInt(draggableId.replace('draggable-', ''))
    const newData = {
      parentId: parseInt(destination.droppableId.replace('droppable-', '')),
    }

    handleUpdateBodyComponent(id, newData)
  }

  const handleDragStart = (e) => {
    console.log('dragStart', e)
  }

  // const move = (sourceList = [], destinationList = [], source, destination) => {
  //   const [removed] = sourceList.splice(source.index, 1)
  //   destinationList.splice(destination.index, 0, removed)

  //   return {
  //     [source.droppableId]: sourceList,
  //     [destination.droppableId]: destinationList,
  //   }
  // }

  return (
    <Box>
      {nestedElements.length > 0 ? (
        <DragDropContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          {nestedElements.map((el, idx) => (
            <Box key={idx} p="4">
              <ComponentListItem el={el} />
            </Box>
          ))}
        </DragDropContext>
      ) : null}
    </Box>
  )
}

const ComponentListItem = ({ el, children }) => {
  const handleAddBodyComponent = (payload) => {
    const attributes = Object.entries(payload.attributes).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value.defaultValue }),
      {}
    )
    db.body.add({
      ...attributes,
      tagName: payload.tagName,
      parentId: payload.parentId,
    })
  }

  const { data: activeElement } = useActiveElementState()
  const dispatch = useActiveElementDispatch()

  return (
    <Box>
      <Box
        w="48"
        rounded="md"
        borderWidth="1px"
        borderColor={activeElement?.id === el.id ? 'blue.500' : 'gray.300'}
        bg={activeElement?.id === el.id ? 'blue.50' : 'white'}
        p="2"
      >
        <Flex align="center">
          <Box>{children}</Box>
          <Button
            variant="link"
            onClick={() =>
              dispatch(
                setActiveElement({
                  tagName: el.tagName,
                  id: el.id,
                })
              )
            }
          >
            {getComponentTitle(el?.tagName)}
            {/* <p className="text-xs">{el.id}</p> */}
          </Button>
          {getComponentAllowedChildren(el.tagName).length > 0 ? (
            <Box ml="auto">
              <Menu placement="bottom-start" strategy="fixed">
                <IconButton
                  as={MenuButton}
                  variant="outline"
                  size="xs"
                  lineHeight="0"
                  icon={<Icon boxSize="4" as={Plus} />}
                />
                <MenuList>
                  {getComponentAllowedChildren(el.tagName).map(
                    (child, cIdx) => (
                      <MenuItem
                        key={cIdx}
                        onClick={() =>
                          handleAddBodyComponent({
                            ...child,
                            parentId: el.id,
                          })
                        }
                      >
                        {getComponentTitle(child.tagName)}
                      </MenuItem>
                    )
                  )}
                </MenuList>
              </Menu>
            </Box>
          ) : null}
        </Flex>
      </Box>
      <Droppable droppableId={`droppable-${el.id}`} type={el.tagName}>
        {(drop, snapshot) => (
          <Box ref={drop.innerRef} {...drop.droppableProps}>
            {el.children.length > 0 ? (
              <Box pt="2">
                <Stack
                  direction="column"
                  borderLeftWidth="2px"
                  borderLeftColor="gray.200"
                >
                  {el.children.map((child, cIdx) => (
                    <Box key={cIdx} pl="2">
                      <Draggable
                        key={`draggable-${child.id}`}
                        draggableId={`draggable-${child.id}`}
                        index={cIdx}
                      >
                        {(drag, snapshot) => (
                          <Box ref={drag.innerRef} {...drag.draggableProps}>
                            <ComponentListItem el={child}>
                              <Center
                                boxSize="4"
                                ml="-1"
                                mr="1"
                                {...drag.dragHandleProps}
                              >
                                <Icon color="gray.600" as={GripVertical} />
                              </Center>
                            </ComponentListItem>
                          </Box>
                        )}
                      </Draggable>
                    </Box>
                  ))}
                </Stack>
              </Box>
            ) : null}
            {drop.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  )
}
