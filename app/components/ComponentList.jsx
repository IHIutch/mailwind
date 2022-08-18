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
  Text,
} from '@chakra-ui/react'
import {
  setActiveElement,
  useActiveElementDispatch,
  useActiveElementState,
} from 'context/activeElement'
import { GripVertical, Plus } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {
  getComponentAllowedChildren,
  getComponentAttributes,
  getComponentTitle,
} from 'utils/functions'
import {
  useBulkUpdateBodyItems,
  useCreateBodyItem,
  useGetBodyItems,
} from 'utils/react-query/bodyItems'
import groupBy from 'lodash/groupBy'

export default function ComponentList() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { data: bodyItems = [], isLoading } = useGetBodyItems()
  const { mutate: handleBulkUpdateBodyItems } = useBulkUpdateBodyItems()

  const groupedBodyItems = groupBy(
    [...bodyItems].sort((a, b) => a.position - b.position),
    'parentId'
  )
  console.log({ groupedBodyItems })

  const getNestedElements = useCallback(
    (list, parent) =>
      list
        .filter((li) => li.parentId === parent.id)
        .map((li) => ({
          ...li,
          children: getNestedElements(list, li),
        })),
    []
  )

  const nestedElements = useMemo(
    () =>
      bodyItems
        .filter((el) => el.parentId === -1)
        .map((el) => {
          return {
            ...el,
            children: getNestedElements(bodyItems, el),
          }
        }),
    [bodyItems, getNestedElements]
  )

  const move = (sourceList = [], destinationList = [], source, destination) => {
    const [removed] = sourceList.splice(source.index, 1)
    destinationList.splice(destination.index, 0, removed)

    return {
      sourceList,
      destinationList,
    }
  }

  const handleDragEnd = (result) => {
    const { source, destination, type } = result
    if (!destination) return // dropped outside the list

    const destinationParentId = parseInt(
      destination.droppableId.replace('droppable-', '')
    )
    const sourceParentId = parseInt(
      source.droppableId.replace('droppable-', '')
    )

    if (source.droppableId === destination.droppableId) {
      // This handles reordering the list
      const reorderedComps = reorderList(
        bodyItems
          .filter((i) => i.parentId === destinationParentId)
          .sort((a, b) => a.position - b.position),
        source.index,
        destination.index
      )

      handleBulkUpdateBodyItems(
        reorderedComps.map((i, idx) => ({
          ...i,
          position: idx,
        }))
      )
    } else {
      // This handles moving an item to another list
      const sourceList = bodyItems.filter(
        (bc) => bc.parentId === sourceParentId
      )
      const destinationList = (bodyItems || []).filter(
        (bc) => bc.parentId === destinationParentId
      )
      const { sourceList: newSourceList, destinationList: newDestinationList } =
        move(sourceList, destinationList, source, destination)

      const newSource = newSourceList.map((i, idx) => ({
        ...i,
        position: idx,
        parentId: sourceParentId,
      }))
      const newDestination = newDestinationList.map((i, idx) => ({
        ...i,
        position: idx,
        parentId: destinationParentId,
      }))

      handleBulkUpdateBodyItems([...newSource, ...newDestination])
    }
  }

  const handleDragStart = (e) => {
    console.log('dragStart', e)
  }

  const reorderList = (list = [], startIndex, endIndex) => {
    const temp = [...list]
    const [removed] = temp.splice(startIndex, 1)
    temp.splice(endIndex, 0, removed)
    return temp
  }

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
  const { mutate: handleCreateBodyItem } = useCreateBodyItem()

  const handleAddBodyComponent = (payload) => {
    const attributes = Object.entries(payload.attributes).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value.defaultValue }),
      {}
    )
    handleCreateBodyItem({
      ...attributes,
      tagName: payload.tagName,
      parentId: payload.parentId,
      position: payload.position,
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
                            position: el.children.length,
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
              <Box>
                <Box borderLeftWidth="2px" borderLeftColor="gray.200">
                  {el.children.map((child, cIdx) => (
                    <Box key={child.id} pl="2" mt="2">
                      <Draggable
                        draggableId={`draggable-${child.id}`}
                        index={cIdx}
                      >
                        {(drag, snapshot) => (
                          <Box ref={drag.innerRef} {...drag.draggableProps}>
                            <ComponentListItem key={cIdx} el={child}>
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
                </Box>
              </Box>
            ) : (
              <Box>
                {getComponentAllowedChildren(el.tagName).length > 0 ? (
                  <Text
                    fontSize="sm"
                    fontStyle="italic"
                    color="gray.400"
                    ml="2"
                  >
                    No Children
                  </Text>
                ) : null}
              </Box>
            )}
            {drop.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  )
}
