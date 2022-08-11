import { useFetcher, useSubmit } from '@remix-run/react'
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
import { GripVertical, Send } from 'lucide-react'
import AttributeList from '../components/AttributeList'
import {
  setActiveElement,
  useActiveElementDispatch,
  useActiveElementState,
} from '../../context/activeElement'
import clsx from 'clsx'
import { db } from '../models/db'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'

export default function Index() {
  const isHydrated = useHydrated()
  const dispatch = useActiveElementDispatch()
  const { data: activeElement } = useActiveElementState()
  const fetcher = useFetcher()
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

  const nestedElements = memoBodyComps
    .filter((el) => el.parentId === -1)
    .map((el) => {
      const getNestedElements = (list, parent) =>
        list
          .filter((li) => li.parentId === parent.id)
          .map((li) => ({
            ...li,
            children: getNestedElements(list, li),
          }))
      return {
        ...el,
        children: getNestedElements(memoBodyComps, el),
      }
    })

  useEffect(() => {
    console.log('bodyComps', memoBodyComps)
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
          <ButtonGroup size="sm" variant="outline" isAttached>
            <Button>Desktop</Button>
            <Button>Mobile</Button>
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
      <Box pt="16">
        <Box
          position="relative"
          h="100%"
          w="300px"
          flexShrink="0"
          borderRightWidth="1px"
          borderRightColor="gray.300"
        >
          <div className="absolute inset-x-0 z-10 flex h-16 items-center border-b bg-white px-4">
            <div className="font-semibold">Components</div>
          </div>
          <div className="absolute inset-x-0 h-full overflow-auto bg-gray-100 pt-16">
            {nestedElements.length > 0 ? (
              <>
                <DragDropContext
                  onDragEnd={handleDragEnd}
                  onDragStart={handleDragStart}
                >
                  {nestedElements.map((el, idx) => (
                    <div key={idx} className="p-4">
                      <ComponentListItem
                        el={el}
                        handleOnClick={handleAddBodyComponent}
                      />
                    </div>
                  ))}
                </DragDropContext>
              </>
            ) : null}
          </div>
        </Box>
        <div className="h-full grow">
          <ClientOnly>
            {() => (
              <Preview
                html={fetcher.data}
                onElementClick={handleElementClick}
              />
            )}
          </ClientOnly>
        </div>
        <Box className="relative h-full w-[300px] shrink-0 border-l bg-gray-100">
          <div className="absolute inset-x-0 z-10 flex h-16 items-center border-b bg-white px-4">
            <div className="font-semibold">Attributes</div>
          </div>
          {activeElement ? (
            <div className="absolute inset-x-0 h-full overflow-auto bg-gray-100 pt-16">
              <div className="p-4">
                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    {activeElement.title}
                  </h3>
                </div>
                <div className="mt-4">
                  <AttributeList
                    activeId={activeElement.id}
                    attributes={activeElement || {}}
                    onChange={(payload) => {
                      handleUpdateBodyComponent(activeElement.id, payload)
                    }}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </Box>
      </Box>
    </Flex>
  )
}

const Preview = ({ html, onElementClick }) => {
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
    <iframe
      id="myIframe"
      className="h-full w-full"
      title="email"
      srcDoc={html}
      // sandbox="allow-same-origin"
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
    <div>
      <div
        className={clsx(
          'w-48 rounded border border-gray-300 p-2',
          activeElement?.id === el.id
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-white'
        )}
      >
        <div className="flex items-center">
          <div>{children}</div>
          <button type="button" onClick={() => dispatch(setActiveElement(el))}>
            {getTitle(el.tagName)}
            {/* <p className="text-xs">{el.id}</p> */}
          </button>
          {getAllowedChildren(el.tagName).length > 0 ? (
            <div className="ml-auto">
              {/* <DropdownMenu.Root>
                <DropdownMenu.Trigger className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 bg-gray-200 hover:bg-gray-300">
                  <div>+</div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  align="start"
                  sideOffset={4}
                  className="min-w-[12rem] rounded border bg-white py-2 shadow"
                >
                  {getAllowedChildren(el.tagName).map((child, cIdx) => (
                    <DropdownMenu.Item
                      asChild
                      key={cIdx}
                      className="min-w-full px-2 py-1 text-left outline-none hover:bg-gray-100"
                    >
                      <button
                        onClick={() =>
                          handleOnClick({
                            ...child,
                            parentId: el.id,
                          })
                        }
                      >
                        {child.title}
                      </button>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root> */}
            </div>
          ) : null}
        </div>
      </div>
      <Droppable droppableId={`droppable-${el.id}`} type={el.tagName}>
        {(drop, snapshot) => (
          <div ref={drop.innerRef} {...drop.droppableProps}>
            {el.children.length > 0 ? (
              <div className="pt-2">
                <div className="border-l-2">
                  {el.children.map((child, cIdx) => (
                    <div key={cIdx} className="pl-2 pt-2 first:pt-0">
                      <Draggable
                        key={`draggable-${child.id}`}
                        draggableId={`draggable-${child.id}`}
                        index={cIdx}
                      >
                        {(drag, snapshot) => (
                          <div ref={drag.innerRef} {...drag.draggableProps}>
                            <ComponentListItem
                              el={child}
                              handleOnClick={handleOnClick}
                            >
                              <div {...drag.dragHandleProps}>
                                <GripVertical className="-ml-2 mr-1 h-4 text-gray-400" />
                              </div>
                            </ComponentListItem>
                          </div>
                        )}
                      </Draggable>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {drop.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  const json = formData.get('json')

  const html = getHtml(JSON.parse(json))
  return html
}
