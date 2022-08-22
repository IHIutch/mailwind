import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useActiveElementState } from 'context/activeElement'
import { useCallback, useEffect } from 'react'
import ColorPicker from './ColorPicker'
import BorderController from './controllers/BorderController'
import PaddingController from './controllers/PaddingController'
import debounce from 'lodash/debounce'
import { getComponentAttributes } from '~/utils/functions'
import { Controller, useForm } from 'react-hook-form'
import {
  useGetBodyItem,
  useUpdateBodyItem,
} from '~/utils/react-query/bodyItems'

export default function AttributeList() {
  const { data: activeElement } = useActiveElementState()
  const { data: bodyItem, isLoading } = useGetBodyItem(activeElement.id)

  const componentAttributes = activeElement
    ? getComponentAttributes(activeElement.tagName)
    : {}

  const {
    register,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  useEffect(() => {
    reset(bodyItem)
  }, [bodyItem, reset])

  const { mutate: handleUpdateBodyItem } = useUpdateBodyItem()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateDebounce = useCallback(
    debounce(handleUpdateBodyItem, 250),
    [handleUpdateBodyItem]
  )

  watch((data, { type }) => {
    if (Object.keys(data).length && type === 'change') {
      handleUpdateDebounce({
        id: activeElement.id,
        payload: data,
      })
    }
  })

  return (
    <Box>
      {bodyItem ? (
        <>
          <Stack spacing="8">
            {'src' in componentAttributes ? (
              <FormControl isInvalid={errors.content}>
                <FormLabel mb="1" fontSize="sm" fontWeight="semibold">
                  Image URL
                </FormLabel>
                <Input size="sm" type="text" {...register('src')} />
                <FormErrorMessage>{errors.src?.message}</FormErrorMessage>
              </FormControl>
            ) : null}
            {'alt' in componentAttributes ? (
              <FormControl isInvalid={errors.content}>
                <FormLabel mb="1" fontSize="sm" fontWeight="semibold">
                  Alt Text
                </FormLabel>
                <Input size="sm" type="text" {...register('alt')} />
                <FormErrorMessage>{errors.alt?.message}</FormErrorMessage>
              </FormControl>
            ) : null}
            {'content' in componentAttributes ? (
              <Box>
                <FormControl isInvalid={errors.content}>
                  <FormLabel mb="1" fontSize="sm" fontWeight="semibold">
                    Content
                  </FormLabel>
                  <>
                    {activeElement.tagName === 'mj-button' ? (
                      <Input size="sm" type="text" {...register('content')} />
                    ) : (
                      <Textarea size="sm" {...register('content')} />
                    )}
                  </>
                  <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
                </FormControl>
              </Box>
            ) : null}

            {'background-color' in componentAttributes ? (
              <FormControl mb="2">
                <FormLabel mb="1" fontSize="sm" fontWeight="semibold">
                  Background Color
                </FormLabel>
                <Controller
                  control={control}
                  name="background-color"
                  render={({ field: { onChange, value } }) => (
                    <ColorPicker onChange={onChange} value={value || ''} />
                  )}
                />
              </FormControl>
            ) : null}

            {'width' in componentAttributes ||
            'height' in componentAttributes ? (
              <Stack direction="row" spacing="4">
                {'width' in componentAttributes ? (
                  <FormControl isInvalid={errors.content}>
                    <FormLabel mb="1" fontSize="sm" fontWeight="semibold">
                      Width
                    </FormLabel>
                    <Input size="sm" type="text" {...register('width')} />
                    <FormErrorMessage>{errors.width?.message}</FormErrorMessage>
                  </FormControl>
                ) : null}
                {'height' in componentAttributes ? (
                  <FormControl isInvalid={errors.content}>
                    <FormLabel mb="1" fontSize="sm" fontWeight="semibold">
                      Height
                    </FormLabel>
                    <Input size="sm" type="text" {...register('height')} />
                    <FormErrorMessage>
                      {errors.height?.message}
                    </FormErrorMessage>
                  </FormControl>
                ) : null}
              </Stack>
            ) : null}
            {'border' in componentAttributes ? (
              <Box>
                <Controller
                  control={control}
                  name="border"
                  render={({ field: { onChange, value } }) => (
                    <BorderController
                      onChange={onChange}
                      value={!value || value === 'none' ? '0 0 0 0' : value}
                    />
                  )}
                />
              </Box>
            ) : null}
            {'padding' in componentAttributes ? (
              <Box>
                <Controller
                  control={control}
                  name="padding"
                  render={({ field: { onChange, value } }) => (
                    <PaddingController
                      label="Padding"
                      onChange={onChange}
                      value={!value || value === 'none' ? '0 0 0 0' : value}
                    />
                  )}
                />
              </Box>
            ) : null}
            {'inner-padding' in componentAttributes ? (
              <Box>
                <Controller
                  control={control}
                  name="inner-padding"
                  render={({ field: { onChange, value } }) => (
                    <PaddingController
                      label="Inner Padding"
                      onChange={onChange}
                      value={!value || value === 'none' ? '0 0 0 0' : value}
                    />
                  )}
                />
              </Box>
            ) : null}

            {'border-radius' in componentAttributes ? (
              <FormControl>
                <FormLabel mb="1" fontSize="sm" fontWeight="semibold">
                  Border Radius
                </FormLabel>
                <Controller
                  control={control}
                  name="border-radius"
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      size="sm"
                      onChange={(value) => field.onChange(value + 'px')}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                />
                <FormErrorMessage>
                  {errors['border-radius']?.message}
                </FormErrorMessage>
              </FormControl>
            ) : null}
          </Stack>
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
                      <Input size="sm"
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
                      <Input size="sm"
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
                      <Input size="sm"
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
