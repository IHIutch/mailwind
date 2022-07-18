import React from 'react'
import Input from './Input'
import Select from './Select'

const AttributeList = ({ onChange, attributes }) => {
  return Object.entries(attributes).map(([key, val], idx) => {
    switch (key) {
      case 'align':
        return (
          <div key={idx} className="mb-2 w-full">
            <Select
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              options={['left', 'right', 'center', 'justify']}
              onChange={(value) =>
                onChange({
                  [key]: {
                    ...val,
                    value,
                  },
                })
              }
              onBlur={() =>
                onChange({
                  [key]: {
                    ...val,
                    value: val.defaultValue,
                  },
                })
              }
            />
          </div>
        )

      case 'border-top':
      case 'border-right':
      case 'border-bottom':
      case 'border-left':
      case 'padding-top':
      case 'padding-right':
      case 'padding-bottom':
      case 'padding-left':
      case 'inner-padding-top':
      case 'inner-padding-right':
      case 'inner-padding-bottom':
      case 'inner-padding-left':
        return (
          <div key={idx} className="mb-2 inline-block w-1/2 pl-2 first:pl-0">
            <Input
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              onChange={(value) =>
                onChange({
                  [key]: {
                    ...val,
                    value,
                  },
                })
              }
              onBlur={() =>
                onChange({
                  [key]: {
                    ...val,
                    value: val.defaultValue,
                  },
                })
              }
            />
          </div>
        )

      default:
        return (
          <div key={idx} className="mb-2 w-full">
            <Input
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              onChange={(value) =>
                onChange({
                  [key]: {
                    ...val,
                    value,
                  },
                })
              }
              onBlur={() =>
                onChange({
                  [key]: {
                    ...val,
                    value: val.defaultValue,
                  },
                })
              }
            />
          </div>
        )
    }
  })
}

export default AttributeList
