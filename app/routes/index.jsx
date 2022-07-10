import { useFetcher } from '@remix-run/react'
import lodashId from 'lodash-id'
import { useEffect, useState } from 'react'
import { MjWrapper } from '../components/BodyComponents'
import getHtml from '../models/getHtml.server'
import lodash from 'lodash'
import { ClientOnly } from 'remix-utils'

lodash.mixin(lodashId)

export default function Index() {
  const fetcher = useFetcher()
  const [data, setData] = useState({
    head: [],
    body: [],
  })
  const [activeElement, setActiveElement] = useState(null)
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
                    content: li.content || 'Press Me',
                    children: getNestedElements(list, li),
                  }))
              return {
                ...el,
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
        console.log({ code })
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

  const handleEditBodyComponent = (id, payload) => {
    const tempData = { ...data }
    const found = tempData.body.find((el) => el.id === id)
    lodash.updateById(tempData.body, id, {
      ...found,
      ...payload,
    })
    console.log({ tempData })
    setData(tempData)
  }

  const handleElementClick = (id) => {
    const found = data.body.find((el) => el.id === id)
    setActiveElement(found)
  }

  return (
    <div className="flex h-screen">
      <div className="relative h-full w-80 border-r">
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
          {nestedElements.map((el, idx) => (
            <div key={idx} className="p-4">
              <ComponentListItem
                el={el}
                handleOnClick={handleAddBodyComponent}
              />
            </div>
          ))}
        </div>
      </div>
      <ClientOnly>
        {() => (
          <Preview html={fetcher.data} onElementClick={handleElementClick} />
        )}
      </ClientOnly>
      <div className="relative h-full w-80 border-l bg-gray-100">
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
                <p className="my-0 text-sm text-gray-600">
                  {activeElement.description}
                </p>
              </div>
              <div className="mt-4">
                {/* <AttributeList
                  attributes={activeElement.attributes}
                  handleOnChange={(key, value) => {
                    const tempData = { ...data }
                    const found = tempData.body.find(
                      (el) => el.id === activeElement.id
                    )
                    found.attributes[key] = value
                    setData(tempData)
                  }}
                /> */}
                {Object.entries(activeElement.attributes).map(([key, val]) => (
                  <div key={key} className="mb-2">
                    <div className="">
                      <label className="text-sm font-semibold">{key}</label>
                    </div>
                    <div className="">
                      <input
                        type="text"
                        onChange={(e) =>
                          handleEditBodyComponent(activeElement.id, {
                            attributes: {
                              ...activeElement.attributes,
                              [key]: { ...val, value: e.target.value },
                            },
                          })
                        }
                        defaultValue={val.value || val.defaultValue}
                        onBlur={(e) =>
                          !e.target.value &&
                          handleEditBodyComponent(activeElement.id, {
                            attributes: {
                              ...activeElement.attributes,
                              [key]: { ...val, value: val.defaultValue },
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const Preview = ({ html, onElementClick }) => {
  const elements = document.querySelectorAll('[data-id]')

  elements.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation()
      onElementClick(el.dataset.id)
    })
    el.addEventListener('mouseover', (e) => {
      e.stopPropagation()
      el.classList.add('ring-2')
    })
    el.addEventListener('mouseout', (e) => {
      e.stopPropagation()
      el.classList.remove('ring-2')
    })
  })

  return (
    <div className="h-full grow">
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p>No data</p>
      )}
    </div>
  )
}

const ComponentListItem = ({ el, handleOnClick }) => {
  return (
    <div>
      <p>{el.title}</p>
      <div>
        <ul>
          {el.allowedChildren.map((child, cIdx) => (
            <li key={cIdx}>
              <button
                type="button"
                className="rounded-lg bg-blue-700 px-2 py-1 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={() =>
                  handleOnClick({
                    ...child,
                    parentId: el.id,
                  })
                }
              >
                Add {child.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {el.children.length > 0 ? (
        <div className="border-l-2 pl-2">
          {el.children.map((child, cIdx) => (
            <ComponentListItem
              key={cIdx}
              el={child}
              handleOnClick={handleOnClick}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  const json = formData.get('json')

  const html = getHtml(JSON.parse(json))
  return html
}
