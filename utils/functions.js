import {
  MjButton,
  MjColumn,
  MjImage,
  MjSection,
  MjText,
  MjWrapper,
} from '../app/components/BodyComponents'

const bodyComps = [MjSection, MjWrapper, MjColumn, MjText, MjImage, MjButton]

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
