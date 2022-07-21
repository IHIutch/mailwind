import { useFetcher } from '@remix-run/react'
import lodashId from 'lodash-id'
import { useEffect, useState } from 'react'
import { MjWrapper } from '../components/BodyComponents'
import getHtml from '../models/getHtml.server'
import lodash from 'lodash'
import { ClientOnly } from 'remix-utils'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { GripVertical } from 'lucide-react'
import AttributeList from '../components/AttributeList'
import {
  setActiveElement,
  useActiveElementDispatch,
  useActiveElementState,
} from '../../context/activeElement'
import clsx from 'clsx'
lodash.mixin(lodashId)

export default function Index() {
  const dispatch = useActiveElementDispatch()
  const { data: activeElement } = useActiveElementState()
  const fetcher = useFetcher()
  const [data, setData] = useState({
    head: [],
    body: [],
  })
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

  const nestedElements = data.body
    .filter((el) => el.parentId === '-1')
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
        children: getNestedElements(data.body, el),
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
                data.body.map((item) => ({
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
          children: data.body
            .filter((el) => el.parentId === '-1')
            .map((el) => {
              const getNestedElements = (list, parent) =>
                list
                  .filter((li) => li.parentId === parent.id)
                  .map((li) => ({
                    tagName: li.tagName,
                    attributes: {
                      ...Object.entries(li.attributes).reduce(
                        (acc, [key, val]) => ({
                          ...acc,
                          [key]: val.value || val.defaultValue,
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
                  ...Object.entries(el.attributes).reduce(
                    (acc, [key, val]) => ({
                      ...acc,
                      [key]: val.value || val.defaultValue,
                    }),
                    {}
                  ),
                  'css-class': 'data-' + el.id,
                },
                children: getNestedElements(data.body, el),
              }
            }),
        },
      ],
    }
    setCode(newCode)
  }, [data])

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

  useEffect(() => {
    const tempData = { ...data }
    lodash.insert(tempData.body, { ...MjWrapper, parentId: '-1' })
    setData(tempData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddBodyComponent = (payload) => {
    const tempData = { ...data }
    lodash.insert(tempData.body, { ...payload })
    setData(tempData)
  }

  const handleUpdateBodyComponent = (id, payload) => {
    const tempData = { ...data }
    const found = tempData.body.find((el) => el.id === id)
    lodash.updateById(tempData.body, id, {
      ...found,
      ...payload,
    })
    setData(tempData)
  }

  const handleElementClick = (id) => {
    const found = data.body.find((el) => el.id === id)
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

    const id = draggableId.replace('draggable-', '')
    const found = data.body.find((el) => el.id === id)
    const newData = {
      ...found,
      parentId: destination.droppableId.replace('droppable-', ''),
    }

    handleUpdateBodyComponent(id, newData)
  }
  const handleDragStart = (e) => {
    console.log('dragStart', e)
  }

  return (
    <div className="flex h-screen">
      <div className="relative h-full w-[300px] shrink-0 border-r">
        <div className="absolute inset-x-0 z-10 flex h-16 items-center border-b bg-white px-4">
          <div className="font-semibold">Components</div>
          {/* <button
            type="button"
            className="ml-auto rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={() => handleAddBodyComponent(MjButton)}
          >
            Add Button
          </button> */}
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
      </div>
      <div className="h-full grow">
        <ClientOnly>
          {() => (
            <Preview html={fetcher.data} onElementClick={handleElementClick} />
          )}
        </ClientOnly>
      </div>
      <div className="relative h-full w-[300px] shrink-0 border-l bg-gray-100">
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
                  attributes={activeElement.attributes}
                  onChange={(payload) => {
                    handleUpdateBodyComponent(activeElement.id, {
                      attributes: {
                        ...activeElement.attributes,
                        ...payload,
                      },
                    })
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
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
        onElementClick(el.dataset.id)
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
            {el.title}
            {/* <p className="text-xs">{el.id}</p> */}
          </button>
          {el.allowedChildren.length > 0 ? (
            <div className="ml-auto">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 bg-gray-200 hover:bg-gray-300">
                  <div>+</div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  align="start"
                  sideOffset={4}
                  className="min-w-[12rem] rounded border bg-white py-2 shadow"
                >
                  {el.allowedChildren.map((child, cIdx) => (
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
              </DropdownMenu.Root>
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
