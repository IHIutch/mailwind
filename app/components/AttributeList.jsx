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
  Stack,
  Text,
} from '@chakra-ui/react'
import { useActiveElementState } from 'context/activeElement'
import { useLiveQuery } from 'dexie-react-hooks'
import { useCallback, useMemo } from 'react'
import { useHydrated } from 'remix-utils'
import { db } from '~/models/db'
import {
  MjButton,
  MjColumn,
  MjImage,
  MjSection,
  MjText,
  MjWrapper,
} from './BodyComponents'
import ColorPicker from './ColorPicker'
import BorderController from './controllers/BorderController'
import PaddingController from './controllers/PaddingController'
import InnerPaddingController from './controllers/InnerPaddingController'
import debounce from 'lodash/debounce'

const bodyCompList = [MjSection, MjWrapper, MjColumn, MjText, MjImage, MjButton]

const AttributeList = () => {
  const isHydrated = useHydrated()
  const { data: activeElement } = useActiveElementState()
  const bodyComps = useLiveQuery(
    () => (isHydrated ? db.body.toArray() : []),
    [isHydrated]
  )
  const memoBodyComps = useMemo(() => bodyComps || [], [bodyComps])

  const liveActiveElement = memoBodyComps.find(
    (el) => el.id === activeElement.id
  )

  const getAttributeValues = () => {
    const found = bodyCompList.find(
      (el) => el.tagName === liveActiveElement?.tagName
    )
    return found
      ? Object.entries(found.attributes).reduce((acc, [key, val], idx) => {
          return {
            ...acc,
            [key]: val,
          }
        }, {})
      : []
  }
  const attributeValues = getAttributeValues()
  const attributeList = Object.keys(attributeValues).map((key) => key)

  console.log({ attributeValues, attributeList })

  const handleUpdateBodyComponent = (payload) => {
    db.body.update(liveActiveElement.id, {
      ...payload,
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateDebounce = useCallback(
    debounce(handleUpdateBodyComponent, 250),
    [handleUpdateBodyComponent]
  )

  return (
    <Box>
      {liveActiveElement ? (
        <>
          <Stack spacing="8">
            {attributeList.includes('border') ? (
              <Box>
                <BorderController
                  value={
                    liveActiveElement['border'] === 'none'
                      ? '0 0 0 0'
                      : liveActiveElement['border']
                  }
                  onChange={(value) =>
                    handleUpdateDebounce({
                      border: value,
                    })
                  }
                />
              </Box>
            ) : null}
            {attributeList.includes('padding') ? (
              <Box>
                <PaddingController
                  value={liveActiveElement['padding'] || '0 0 0 0'}
                  onChange={(value) =>
                    handleUpdateDebounce({
                      padding: value,
                    })
                  }
                />
              </Box>
            ) : null}
            {attributeList.includes('inner-padding') ? (
              <Box>
                <InnerPaddingController
                  value={liveActiveElement['inner-padding'] || '0 0 0 0'}
                  onChange={(value) =>
                    handleUpdateDebounce({
                      'inner-padding': value,
                    })
                  }
                />
              </Box>
            ) : null}
          </Stack>
          {/* {attributeList.includes('border-radius') ? (
            <FormControl>
              <FormLabel>Border Radius</FormLabel>
              <NumberInput
                onChange={(value) =>
                  handleUpdateDebounce({
                    'border-radius': value + 'px',
                  })
                }
                defaultValue={liveActiveElement['border-radius'] || '0'}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          ) : null} */}

          {/* <Box mt="12">
            {Object.entries(attributeValues).map(([key, val], idx) => {
              switch (key) {
                case 'align':
                  return (
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Select
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
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
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Select
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
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
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Select
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
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
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Select
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
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
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Input
                        type="url"
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
                      />
                    </FormControl>
                  )

                case 'direction':
                  return (
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Select
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
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
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Select
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
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
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Select
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
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
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Select
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
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
                    <FormControl
                      key={`${liveActiveElement.id}-${idx}`}
                      w="1/2"
                      mb="2"
                      pl="2"
                    >
                      <FormLabel>{key}</FormLabel>
                      <Input
                        type="text"
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
                      />
                    </FormControl>
                  )

                case 'color':
                case 'background-color':
                case 'container-background-color':
                  return (
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <ColorPicker
                        label={key}
                        value={val || 'transparent'}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
                      />
                    </FormControl>
                  )

                case 'target':
                  return (
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Select
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
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
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Select
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
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
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Select
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
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
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Select
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
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
                    <FormControl key={`${liveActiveElement.id}-${idx}`} mb="2">
                      <FormLabel>{key}</FormLabel>
                      <Input
                        value={val || ''}
                        onChange={(e) =>
                          handleUpdateBodyComponent({ [key]: e.target.value })
                        }
                      />
                    </FormControl>
                  )
              }
            })}
          </Box> */}
        </>
      ) : null}
    </Box>
  )
}

export default AttributeList
