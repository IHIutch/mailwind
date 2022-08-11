import { useFetcher } from '@remix-run/react'
import { useEffect, useMemo, useState } from 'react'
import {
  MjButton,
  MjColumn,
  MjImage,
  MjSection,
  MjText,
  MjWrapper,
} from '../components/BodyComponents'
import getHtml from '../models/getHtml.server'
import { ClientOnly, useHydrated } from 'remix-utils'
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { GripVertical, Plus, Send } from 'lucide-react'
import AttributeList from '../components/AttributeList'
import {
  setActiveElement,
  useActiveElementDispatch,
  useActiveElementState,
} from '../../context/activeElement'
import { db } from '../models/db'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react'

export default function Index() {
  const isHydrated = useHydrated()
  const dispatch = useActiveElementDispatch()
  const { data: activeElement } = useActiveElementState()
  const fetcher = useFetcher()
  const [previewSize, setPreviewSize] = useState('desktop')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState({
    tagName: 'mjml',
    attributes: {},
    children: [
      {
        tagName: 'mj-head',
        children: [],
      },
      {
        tagName: 'mj-body',
        attributes: {},
        children: [],
      },
    ],
  })

  let bodyComps = useLiveQuery(
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

  useEffect(() => {
    const newCode = {
      tagName: 'mjml',
      attributes: {},
      children: [
        {
          tagName: 'mj-head',
          children: [
            {
              tagName: 'mj-html-attributes',
              attributes: {},
              children:
                memoBodyComps.map((item) => ({
                  tagName: 'mj-selector',
                  attributes: {
                    path: '.data-' + item.id,
                  },
                  children: [
                    {
                      tagName: 'mj-html-attribute',
                      attributes: {
                        name: 'data-id',
                      },
                      content: item.id,
                    },
                  ],
                })) || [],
            },
          ],
        },
        {
          tagName: 'mj-body',
          attributes: {},
          children: memoBodyComps
            .filter((el) => el.parentId === -1)
            .map((el) => {
              const getNestedElements = (list, parent) =>
                list
                  .filter((li) => li.parentId === parent.id)
                  .map((li) => ({
                    tagName: li.tagName,
                    attributes: {
                      ...Object.entries(li).reduce(
                        (acc, [key, val]) => ({
                          ...acc,
                          [key]: val,
                        }),
                        {}
                      ),
                      'css-class': 'data-' + li.id,
                    },
                    content:
                      li.tagName === 'mj-text'
                        ? '<p>Text</p>'
                        : li.content || 'Press Me',
                    children: getNestedElements(list, li),
                  }))
              return {
                tagName: el.tagName,
                attributes: {
                  ...Object.entries(el).reduce(
                    (acc, [key, val]) => ({
                      ...acc,
                      [key]: val,
                    }),
                    {}
                  ),
                  'css-class': 'data-' + el.id,
                },
                children: getNestedElements(memoBodyComps, el),
              }
            }),
        },
      ],
    }
    setCode(newCode)
  }, [memoBodyComps])

  useEffect(() => {
    try {
      if (code) {
        fetcher.submit({ json: JSON.stringify(code) }, { method: 'post' })
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        throw error
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  // useEffect(() => {
  //   const tempData = { ...data }
  //   lodash.insert(tempData.body, { ...MjWrapper, parentId: '-1' })
  //   setData(tempData)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

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

  const handleUpdateBodyComponent = (id, payload) => {
    console.log({ id, payload })
    db.body.update(id, {
      ...payload,
    })
  }

  const handleElementClick = (id) => {
    const found = memoBodyComps.find((el) => el.id === id)
    dispatch(setActiveElement(found))
  }

  // const move = (sourceList = [], destinationList = [], source, destination) => {
  //   const [removed] = sourceList.splice(source.index, 1)
  //   destinationList.splice(destination.index, 0, removed)

  //   return {
  //     [source.droppableId]: sourceList,
  //     [destination.droppableId]: destinationList,
  //   }
  // }

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

  const emailFetcher = useFetcher()
  const downloadFetcher = useFetcher()

  const handleSendEmail = () => {
    emailFetcher.submit(
      {
        email,
        json: JSON.stringify(code),
      },
      { method: 'post', action: '/send-email' }
    )
  }

  const handleDownload = () => {
    console.log('download')
    downloadFetcher.submit(
      {
        json: JSON.stringify(code),
      },
      { method: 'post', action: '/download' }
    )
  }

  useEffect(() => {
    if (downloadFetcher.data) {
      var blob = new Blob([downloadFetcher.data], {
        type: 'text/html;charset=utf-8',
      })
      var link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'email.html'

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
    }
  }, [downloadFetcher.data])

  return (
    <Flex h="100vh">
      <Box
        position="fixed"
        top="0"
        right="0"
        left="0"
        h="16"
        bg="white"
        shadow="sm"
        borderBottomWidth="1px"
        borderBottomColor="gray.100"
        display="flex"
        px="8"
      >
        <Flex
          position="absolute"
          left="0"
          right="0"
          align="center"
          justify="center"
          h="100%"
        >
          <ButtonGroup size="sm" isAttached>
            <Button
              colorScheme={previewSize === 'desktop' ? 'blue' : 'gray'}
              variant={previewSize === 'desktop' ? 'solid' : 'outline'}
              onClick={() => setPreviewSize('desktop')}
            >
              Desktop
            </Button>
            <Button
              colorScheme={previewSize === 'mobile' ? 'blue' : 'gray'}
              variant={previewSize === 'mobile' ? 'solid' : 'outline'}
              onClick={() => setPreviewSize('mobile')}
            >
              Mobile
            </Button>
          </ButtonGroup>
        </Flex>
        <Flex ml="auto" alignItems="center">
          <Button
            colorScheme="blue"
            onClick={handleDownload}
            isLoading={downloadFetcher.state === 'submitting'}
          >
            Download
          </Button>
          <Box ml="4">
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Button>Send Test</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <Flex p="4" alignItems="flex-end">
                  <FormControl>
                    <FormLabel htmlFor="yourEmail">Your Email</FormLabel>
                    <Input
                      onChange={(e) => setEmail(e.target.value)}
                      id="yourEmail"
                      type="email"
                    />
                  </FormControl>
                  <IconButton
                    ml="2"
                    colorScheme="blue"
                    icon={<Icon boxSize="4" as={Send} />}
                    onClick={handleSendEmail}
                    isLoading={emailFetcher.state === 'loading'}
                  />
                </Flex>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>
      </Box>
      <Flex w="100%" pt="16">
        <Box
          position="relative"
          h="100%"
          w="300px"
          flexShrink="0"
          borderRightWidth="1px"
          borderRightColor="gray.200"
        >
          <Flex
            position="absolute"
            top="0"
            left="0"
            right="0"
            zIndex="10"
            align="center"
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
            bg="white"
            px="4"
            h="12"
          >
            <Heading fontWeight="semibold" fontSize="lg">
              Components
            </Heading>
          </Flex>
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            h="100%"
            overflow="auto"
            bg="gray.50"
            pt="12"
          >
            {nestedElements.length > 0 ? (
              <>
                <DragDropContext
                  onDragEnd={handleDragEnd}
                  onDragStart={handleDragStart}
                >
                  {nestedElements.map((el, idx) => (
                    <Box key={idx} p="4">
                      <ComponentListItem
                        el={el}
                        handleOnClick={handleAddBodyComponent}
                      />
                    </Box>
                  ))}
                </DragDropContext>
              </>
            ) : null}
          </Box>
        </Box>
        <Box h="100%" flexGrow="1">
          <ClientOnly>
            {() => (
              <Preview
                width={previewSize === 'desktop' ? '100%' : '324px'}
                html={fetcher.data}
                onElementClick={handleElementClick}
              />
            )}
          </ClientOnly>
        </Box>
        <Box
          position="relative"
          h="100%"
          w="300px"
          flexShrink="0"
          borderLeftWidth="1px"
          borderLeftColor="gray.200"
          bg="gray.50"
        >
          <Flex
            position="absolute"
            top="0"
            left="0"
            right="0"
            zIndex="10"
            align="center"
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
            bg="white"
            px="4"
            h="12"
          >
            <Heading fontWeight="semibold" fontSize="lg">
              Attribute
            </Heading>
          </Flex>
          {activeElement ? (
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              h="100%"
              overflow="auto"
              bg="gray.50"
              pt="12"
            >
              <Box p="4">
                <Text mb="1" fontSize="lg" fontWeight="semibold">
                  {activeElement.title}
                </Text>
                <Box mt="4" position="relative" zIndex="1">
                  <AttributeList
                    activeId={activeElement.id}
                    attributes={activeElement || {}}
                    onChange={(payload) => {
                      handleUpdateBodyComponent(activeElement.id, payload)
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ) : null}
        </Box>
      </Flex>
    </Flex>
  )
}

const Preview = ({ width, html, onElementClick }) => {
  const setEventListeners = (e) => {
    var iframe = e.target
    const elements =
      iframe?.contentWindow?.document?.querySelectorAll('[data-id]') || []

    elements.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation()
        onElementClick(parseInt(el.dataset.id))
      })
      el.addEventListener('mouseover', (e) => {
        e.stopPropagation()
        el.style.boxShadow = 'rgba(59, 130, 246, 0.5) 0px 0px 0px 2px inset'
      })
      el.addEventListener('mouseout', (e) => {
        e.stopPropagation()
        el.style.boxShadow = 'none'
      })
    })
  }

  return html ? (
    <Box
      mx="auto"
      borderWidth="1px"
      as="iframe"
      height="100%"
      width={width}
      title="email"
      srcDoc={html}
      onLoad={setEventListeners}
    />
  ) : (
    <p>No data</p>
  )
}

const ComponentListItem = ({ el, handleOnClick, children }) => {
  const { data: activeElement } = useActiveElementState()
  const dispatch = useActiveElementDispatch()

  const bodyComps = [MjSection, MjWrapper, MjColumn, MjText, MjImage, MjButton]

  const getAllowedChildren = (tagName) => {
    const found = bodyComps.find((el) => el.tagName === tagName)
    return found ? found.allowedChildren : []
  }
  const getTitle = (tagName) => {
    const found = bodyComps.find((el) => el.tagName === tagName)
    return found ? found.title : ''
  }

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
          <Button variant="link" onClick={() => dispatch(setActiveElement(el))}>
            {getTitle(el.tagName)}
            {/* <p className="text-xs">{el.id}</p> */}
          </Button>
          {getAllowedChildren(el.tagName).length > 0 ? (
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
                  {getAllowedChildren(el.tagName).map((child, cIdx) => (
                    <MenuItem
                      key={cIdx}
                      onClick={() =>
                        handleOnClick({
                          ...child,
                          parentId: el.id,
                        })
                      }
                    >
                      {getTitle(child.tagName)}
                    </MenuItem>
                  ))}
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
                            <ComponentListItem
                              el={child}
                              handleOnClick={handleOnClick}
                            >
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

export async function action({ request }) {
  const formData = await request.formData()
  const json = formData.get('json')

  const html = getHtml(JSON.parse(json))
  return html
}
