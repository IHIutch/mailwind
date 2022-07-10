import { useFetcher } from '@remix-run/react'
import lodashId from 'lodash-id'
import { useEffect, useState } from 'react'
import { MjButton, MjWrapper } from '../components/BodyComponents'
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
                      ...li.attributes.map((attr) => ({
                        [attr.name]: attr.value || 0,
                      })),
                      'css-class': 'data-' + li.id,
                    },
                    // content: 'Press me',
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
        fetcher.submit({ json: JSON.stringify(code) }, { method: 'post' })
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        throw error
      }
    }
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
    console.log({ tempData })
    setData(tempData)
  }

  return (
    <div className="flex h-screen">
      <div className="h-full w-80 border-r bg-gray-100">
        <div className="flex w-full items-center border-b bg-white p-4">
          <div className="font-semibold">Components</div>
          {/* <button
            type="button"
            className="ml-auto rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={() => handleAddBodyComponent(MjButton)}
          >
            Add Button
          </button> */}
        </div>
        <div>
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
          <Preview html={fetcher.data} onElementClick={setActiveElement} />
        )}
      </ClientOnly>
      <div className="h-full w-80 border-r bg-gray-100">
        <div className="flex w-full items-center border-b bg-white p-4">
          <div className="font-semibold">Attributes</div>
        </div>
        <div>{activeElement}</div>
      </div>
    </div>
  )
}

const Preview = ({ html, onElementClick }) => {
  const elements = document.querySelectorAll('[data-id]')

  elements.forEach((el) => {
    el.addEventListener('click', () => {
      onElementClick(el.dataset.id)
    })
    el.addEventListener('mouseover', () => {
      el.classList.add('ring-2')
    })
    el.addEventListener('mouseout', () => {
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
