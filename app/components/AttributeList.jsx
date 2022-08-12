import { Box, Select, Stack, Text } from '@chakra-ui/react'
import { useActiveElementState } from 'context/activeElement'
import { useLiveQuery } from 'dexie-react-hooks'
import { useCallback } from 'react'
import { useHydrated } from 'remix-utils'
import { db } from '~/models/db'
import ColorPicker from './ColorPicker'
import BorderController from './controllers/BorderController'
import PaddingController from './controllers/PaddingController'
import InnerPaddingController from './controllers/InnerPaddingController'
import debounce from 'lodash/debounce'
import { getComponentAttributes } from 'utils/functions'

const AttributeList = () => {
  const isHydrated = useHydrated()
  const { data: activeElement } = useActiveElementState()
  const bodyComps = useLiveQuery(
    () => (isHydrated ? db.body.toArray() : []),
    [isHydrated]
  )
  const currentLiveElement = (bodyComps || []).find(
    (el) => el.id === activeElement.id
  )

  const componentAttributes = currentLiveElement
    ? getComponentAttributes(currentLiveElement.tagName)
    : {}

  const handleUpdateBodyComponent = (payload) => {
    db.body.update(activeElement.id, {
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
      {currentLiveElement ? (
        <>
          <Stack spacing="8">
            {'border' in componentAttributes ? (
              <Box>
                <BorderController
                  value={
                    currentLiveElement['border'] === 'none'
                      ? '0 0 0 0'
                      : currentLiveElement['border']
                  }
                  onChange={(value) =>
                    handleUpdateDebounce({
                      border: value,
                    })
                  }
                />
              </Box>
            ) : null}
            {'padding' in componentAttributes ? (
              <Box>
                <PaddingController
                  value={currentLiveElement['padding'] || '0 0 0 0'}
                  onChange={(value) =>
                    handleUpdateDebounce({
                      padding: value,
                    })
                  }
                />
              </Box>
            ) : null}
            {'inner-padding' in componentAttributes ? (
              <Box>
                <InnerPaddingController
                  value={currentLiveElement['inner-padding'] || '0 0 0 0'}
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
                defaultValue={currentLiveElement['border-radius'] || '0'}
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                      key={`${currentLiveElement.id}-${idx}`}
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
                    <FormControl key={`${currentLiveElement.id}-${idx}`} mb="2">
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
