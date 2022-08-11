import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from '@chakra-ui/react'
import {
  MjButton,
  MjColumn,
  MjImage,
  MjSection,
  MjText,
  MjWrapper,
} from './BodyComponents'
import ColorPicker from './ColorPicker'

const bodyComps = [MjSection, MjWrapper, MjColumn, MjText, MjImage, MjButton]

const AttributeList = ({ activeId, onChange, attributes, tagName }) => {
  const getAttributes = () => {
    const found = bodyComps.find((el) => el.tagName === tagName)
    return found ? Object.keys(found.attributes).map((key) => key) : []
  }
  const theAttributes = getAttributes()

  return (
    <Box>
      {theAttributes.includes('border-top') ? (
        <FormControl>
          <FormLabel>Border Top</FormLabel>
          <NumberInput
            onChange={(e) => onChange({ 'border-top': e.target.value + 'px' })}
            // value={attributes['border-top'] + 'px'}
            defaultValue={attributes['border-top']?.toString() || 0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      ) : null}

      {theAttributes.includes('border-radius') ? (
        <FormControl>
          <FormLabel>Border Radius</FormLabel>
          <NumberInput
            onChange={(e) =>
              onChange({ 'border-radius': e.target.value + 'px' })
            }
            // value={attributes['border-top'] + 'px'}
            defaultValue={attributes['border-radius']?.toString() + 'px' || 0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      ) : null}

      <Box mt="12">
        {Object.entries(attributes).map(([key, val], idx) => {
          switch (key) {
            case 'align':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Select
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  >
                    {['left', 'right', 'center', 'justify'].map(
                      (value, iIdx) => (
                        <option key={iIdx} value={value}>
                          {value}
                        </option>
                      )
                    )}
                  </Select>
                </FormControl>
              )

            case 'background-position':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Select
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  >
                    {[
                      'top left',
                      'top center',
                      'top right',
                      'center left',
                      'center center',
                      'center right',
                      'bottom left',
                      'bottom center',
                      'bottom right',
                    ].map((value, iIdx) => (
                      <option key={iIdx} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )

            case 'background-repeat':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Select
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  >
                    {['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].map(
                      (value, iIdx) => (
                        <option key={iIdx} value={value}>
                          {value}
                        </option>
                      )
                    )}
                  </Select>
                </FormControl>
              )

            case 'background-size':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Select
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  >
                    {['auto', 'cover', 'contain'].map((value, iIdx) => (
                      <option key={iIdx} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )

            case 'background-url':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Input
                    type="url"
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  />
                </FormControl>
              )

            case 'direction':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Select
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  >
                    {['ltr', 'rtl'].map((value, iIdx) => (
                      <option key={iIdx} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )

            case 'font-style':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Select
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  >
                    {['none', 'italic'].map((value, iIdx) => (
                      <option key={iIdx} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )

            case 'text-transform':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Select
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  >
                    {['none', 'capitalize', 'lowercase', 'uppercase'].map(
                      (value, iIdx) => (
                        <option key={iIdx} value={value}>
                          {value}
                        </option>
                      )
                    )}
                  </Select>
                </FormControl>
              )

            case 'font-weight':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Select
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  >
                    {[
                      '100',
                      '200',
                      '300',
                      '400',
                      '500',
                      '600',
                      '700',
                      '800',
                      '900',
                    ].map((value, iIdx) => (
                      <option key={iIdx} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
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
                <FormControl key={`${activeId}-${idx}`} w="1/2" mb="2" pl="2">
                  <FormLabel>{key}</FormLabel>
                  <Input
                    type="text"
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  />
                </FormControl>
              )

            case 'color':
            case 'background-color':
            case 'container-background-color':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <ColorPicker
                    label={key}
                    value={val || 'transparent'}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  />
                </FormControl>
              )

            case 'target':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Select
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  >
                    {['_self', '_blank'].map((value, iIdx) => (
                      <option key={iIdx} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )

            case 'text-align':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Select
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  >
                    {['left', 'right', 'center'].map((value, iIdx) => (
                      <option key={iIdx} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )

            case 'text-decoration':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Select
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  >
                    {['none', 'underline', 'line-through'].map(
                      (value, iIdx) => (
                        <option key={iIdx} value={value}>
                          {value}
                        </option>
                      )
                    )}
                  </Select>
                </FormControl>
              )

            case 'vertical-align':
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Select
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  >
                    {['top', 'middle', 'bottom'].map((value, iIdx) => (
                      <option key={iIdx} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )

            default:
              return (
                <FormControl key={`${activeId}-${idx}`} mb="2">
                  <FormLabel>{key}</FormLabel>
                  <Input
                    value={val || ''}
                    onChange={(e) => onChange({ [key]: e.target.value })}
                  />
                </FormControl>
              )
          }
        })}
      </Box>
    </Box>
  )
}

export default AttributeList
