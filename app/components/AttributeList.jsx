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

      case 'background-position':
        return (
          <div key={idx} className="mb-2 w-full">
            <Select
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              options={[
                'top left',
                'top center',
                'top right',
                'center left',
                'center center',
                'center right',
                'bottom left',
                'bottom center',
                'bottom right',
              ]}
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

      case 'background-repeat':
        return (
          <div key={idx} className="mb-2 w-full">
            <Select
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              options={['repeat', 'repeat-x', 'repeat-y', 'no-repeat']}
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

      case 'background-size':
        return (
          <div key={idx} className="mb-2 w-full">
            <Select
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              options={['auto', 'cover', 'contain']}
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

      case 'background-url':
        return (
          <div key={idx} className="mb-2 w-full">
            <Input
              type="url"
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

      case 'direction':
        return (
          <div key={idx} className="mb-2 w-full">
            <Select
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              options={['ltr', 'rtl']}
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

      case 'font-style':
        return (
          <div key={idx} className="mb-2 w-full">
            <Select
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              options={['none', 'italic']}
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

      case 'text-transform':
        return (
          <div key={idx} className="mb-2 w-full">
            <Select
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              options={['none', 'capitalize', 'lowercase', 'uppercase']}
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

      case 'font-weight':
        return (
          <div key={idx} className="mb-2 w-full">
            <Select
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              options={[
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
              ]}
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

      case 'background-position-x':
      case 'background-position-y':
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

      case 'target':
        return (
          <div key={idx} className="mb-2 w-full">
            <Select
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              options={['_self', '_blank']}
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

      case 'text-align':
        return (
          <div key={idx} className="mb-2 w-full">
            <Select
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              options={['left', 'right', 'center']}
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

      case 'text-decoration':
        return (
          <div key={idx} className="mb-2 w-full">
            <Select
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              options={['none', 'underline', 'line-through']}
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

      case 'vertical-align':
        return (
          <div key={idx} className="mb-2 w-full">
            <Select
              label={val.label}
              value={val.value}
              defaultValue={val.defaultValue}
              options={['top', 'middle', 'bottom']}
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
