import { useMemo, useState } from 'react'
import { ClientOnly, useHydrated } from 'remix-utils'
import { Send } from 'lucide-react'
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
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react'
import getHtml from '~/models/getHtml.client'
import ComponentList from '~/components/ComponentList'
import { formatMjml, getComponentTitle } from 'utils/functions'
import { useGetBodyItems } from 'utils/react-query/bodyItems'

export default function Index() {
  const { data: activeElement } = useActiveElementState()
  const [previewSize, setPreviewSize] = useState('desktop')

  const handleSendEmail = () => {
    console.log('send email')
  }

  const handleDownload = async () => {
    const bodyComps = await db.body.orderBy('position').toArray()
    const html = getHtml(formatMjml(bodyComps))
    if (html) {
      var blob = new Blob([html], {
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
                <Button isDisabled>Send Test</Button>
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
            <ClientOnly>{() => <ComponentList />}</ClientOnly>
          </Box>
        </Box>
        <Box h="100%" flexGrow="1" bg="gray.50">
          <ClientOnly>
            {() => (
              <Preview width={previewSize === 'desktop' ? '100%' : '640px'} />
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
              {getComponentTitle(activeElement?.tagName) || 'Attributes'}
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
                <Box mt="4" position="relative" zIndex="1">
                  <ClientOnly>{() => <AttributeList />}</ClientOnly>
                </Box>
              </Box>
            </Box>
          ) : null}
        </Box>
      </Flex>
    </Flex>
  )
}

const Preview = ({ width }) => {
  const { data: bodyItems = [], isLoading } = useGetBodyItems()
  const dispatch = useActiveElementDispatch()

  const handleElementClick = (id) => {
    const found = bodyItems.find((el) => el.id === id)
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

  const html = useMemo(() => {
    return getHtml(formatMjml(bodyItems))
  }, [bodyItems])

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

export async function action({ request }) {
  const formData = await request.formData()
  const json = formData.get('json')

  const html = getHtml(JSON.parse(json))
  return html
}
