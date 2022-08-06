import React from 'react'
import ColorPicker from './ColorPicker'
import Input from './Input'
import Select from './Select'

const AttributeList = ({ activeId, onChange, attributes }) => {
  const handleChange = (payload) => {
    onChange(payload)
  }

  return Object.entries(attributes).map(([key, val], idx) => {
    switch (key) {
      case 'align':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Select
              label={key}
              value={val || ''}
              options={['left', 'right', 'center', 'justify']}
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )

      case 'background-position':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Select
              label={key}
              value={val || ''}
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
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )

      case 'background-repeat':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Select
              label={key}
              value={val || ''}
              options={['repeat', 'repeat-x', 'repeat-y', 'no-repeat']}
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )

      case 'background-size':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Select
              label={key}
              value={val || ''}
              options={['auto', 'cover', 'contain']}
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )

      case 'background-url':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Input
              type="url"
              label={key}
              value={val || ''}
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )

      case 'direction':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Select
              label={key}
              value={val || ''}
              options={['ltr', 'rtl']}
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )

      case 'font-style':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Select
              label={key}
              value={val || ''}
              options={['none', 'italic']}
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )

      case 'text-transform':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Select
              label={key}
              value={val || ''}
              options={['none', 'capitalize', 'lowercase', 'uppercase']}
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )

      case 'font-weight':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Select
              label={key}
              value={val || ''}
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
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
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
          <div
            key={`${activeId}-${idx}`}
            className="mb-2 inline-block w-1/2 pl-2 first:pl-0"
          >
            <Input
              type="text"
              label={key}
              value={val || ''}
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )

      case 'color':
      case 'background-color':
      case 'container-background-color':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <ColorPicker
              label={key}
              value={val || '#ffffff'}
              onChange={(value) => {
                handleChange({ [key]: value })
              }}
            />
          </div>
        )

      case 'target':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Select
              label={key}
              value={val || ''}
              options={['_self', '_blank']}
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )

      case 'text-align':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Select
              label={key}
              value={val || ''}
              options={['left', 'right', 'center']}
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )

      case 'text-decoration':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Select
              label={key}
              value={val || ''}
              options={['none', 'underline', 'line-through']}
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )

      case 'vertical-align':
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Select
              label={key}
              value={val || ''}
              options={['top', 'middle', 'bottom']}
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )

      default:
        return (
          <div key={`${activeId}-${idx}`} className="mb-2 w-full">
            <Input
              label={key}
              value={val || ''}
              onChange={(value) => handleChange({ [key]: value })}
              // onBlur={() => handleChange({ [key]: val.defaultValue })}
            />
          </div>
        )
    }
  })
}

export default AttributeList
