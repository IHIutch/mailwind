import { useEffect, useMemo, useState } from 'react'

import { ClientOnly, useHydrated } from 'remix-utils'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { GripVertical, Plus, Send } from 'lucide-react'
import AttributeList from '../components/AttributeList'
import {
  setActiveElement,
  useActiveElementDispatch,
  useActiveElementState,
} from '../../context/activeElement'
import {
  getComponentAllowedChildren,
  getComponentTitle,
} from '../../utils/functions'
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
import getHtml from '~/models/getHtml.client'
import ComponentList from '~/components/ComponentList'

export default function Index() {
  const isHydrated = useHydrated()
  const dispatch = useActiveElementDispatch()
  const { data: activeElement } = useActiveElementState()
  const [previewSize, setPreviewSize] = useState('desktop')
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    const newCode = {
      tagName: 'mjml',
      attributes: {},
      children: [
        {
          tagName: 'mj-head',
          children: [
            {
              tagName: 'mj-breakpoint',
              attributes: {
                width: '640px',
              },
            },
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
                        (acc, [key, val]) =>
                          key === 'content' ? acc : { ...acc, [key]: val },
                        {}
                      ),
                      'css-class': 'data-' + li.id,
                    },
                    content: li.content,
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

  const handleSendEmail = () => {
    console.log('send email')
  }

  const handleDownload = () => {
    if (code) {
      var blob = new Blob([code], {
        type: 'text/html;charset=utf-8',
      })
      var link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'email.html'

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
    }
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
          <Button colorScheme="blue" onClick={handleDownload}>
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
                    <Input id="yourEmail" type="email" />
                  </FormControl>
                  <IconButton
                    ml="2"
                    colorScheme="blue"
                    icon={<Icon boxSize="4" as={Send} />}
                    onClick={handleSendEmail}
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
          w="320px"
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
            <ComponentList />
          </Box>
        </Box>
        <Box h="100%" flexGrow="1" bg="gray.50">
          <ClientOnly>
            {() => (
              <Preview
                width={previewSize === 'desktop' ? '100%' : '640px'}
                html={code}
              />
            )}
          </ClientOnly>
        </Box>
        <Box
          position="relative"
          h="100%"
          w="320px"
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
                  <AttributeList key={activeElement.id} />
                </Box>
              </Box>
            </Box>
          ) : null}
        </Box>
      </Flex>
    </Flex>
  )
}

const Preview = ({ width, html }) => {
  const isHydrated = useHydrated()
  const bodyComps =
    useLiveQuery(() => (isHydrated ? db.body.toArray() : []), [isHydrated]) ||
    []

  const dispatch = useActiveElementDispatch()

  const handleElementClick = (id) => {
    const found = bodyComps.find((el) => el.id === id)
    dispatch(
      setActiveElement({
        id: found.id,
        tagName: found.tagName,
      })
    )
  }

  const setEventListeners = (e) => {
    var iframe = e.target
    const elements =
      iframe?.contentWindow?.document?.querySelectorAll('[data-id]') || []

    elements.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation()
        handleElementClick(parseInt(el.dataset.id))
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

  const newHtml = getHtml(html)

  return newHtml ? (
    <Box
      mx="auto"
      borderWidth="1px"
      as="iframe"
      height="100%"
      width={width}
      title="email"
      srcDoc={newHtml}
      onLoad={setEventListeners}
    />
  ) : (
    <p>No data</p>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  const json = formData.get('json')

  const html = getHtml(JSON.parse(json))
  return html
}
