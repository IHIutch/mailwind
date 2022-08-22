import { nanoid } from 'nanoid-good'
import en from 'nanoid-good/locale/en'

import {
  MjButton,
  MjColumn,
  MjDivider,
  MjImage,
  MjSection,
  MjText,
  MjWrapper,
} from '../components/BodyComponents'

const bodyComps = [
  MjSection,
  MjWrapper,
  MjColumn,
  MjText,
  MjImage,
  MjButton,
  MjDivider,
]

export const getComponentAllowedChildren = (tagName) => {
  const found = bodyComps.find((el) => el.tagName === tagName)
  return found ? found.allowedChildren : []
}

export const getComponentTitle = (tagName) => {
  const found = bodyComps.find((el) => el.tagName === tagName)
  return found ? found.title : ''
}

export const getComponentAttributes = (tagName) => {
  const found = bodyComps.find((el) => el.tagName === tagName)
  return found
    ? Object.entries(found.attributes).reduce((acc, [key, val]) => {
        return {
          ...acc,
          [key]: val,
        }
      }, {})
    : {}
}

export const formatMjml = (list) => {
  return {
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
              list.map((item) => ({
                tagName: 'mj-selector',
                attributes: {
                  path: '.data-' + (item?.id || '0'),
                },
                children: [
                  {
                    tagName: 'mj-html-attribute',
                    attributes: {
                      name: 'data-id',
                    },
                    content: item?.id || '0',
                  },
                ],
              })) || [],
          },
        ],
      },
      {
        tagName: 'mj-body',
        attributes: {},
        children: list
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
                    'css-class': 'data-' + (li.id || '0'),
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
                'css-class': 'data-' + (el.id || '0'),
              },
              children: getNestedElements(list, el),
            }
          }),
      },
    ],
  }
}

export const getNanoId = () => {
  const handleGetNanoId = nanoid(en)
  return handleGetNanoId(12)
}
