import { type ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import { useSelectedBlockState } from '@/context/selectedBlock'
import { type DefaultFormValues } from '@/pages/templates/[id]'
import { cn } from '@/utils/functions'
import ColorInput from '../inputs/ColorInput'
import FontSizeSelect from '../inputs/FontSizeSelect'
import LineHeightSelect from '../inputs/LineHeightSelect'
import PaddingSelect from '../inputs/PaddingSelect'
import TextInput from '../inputs/TextInput'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/Accordion'
import { Label } from '../ui/Label'

export default function ButtonSidebar({
  className,
  closeButton,
}: {
  className?: string
  closeButton?: ReactNode
}) {
  const { data: selectedBlockIndex } = useSelectedBlockState()
  const { control } = useFormContext<DefaultFormValues>()

  return (
    <div className={cn('relative', className)}>
      {closeButton}
      <div className="border-b p-3">
        <h2 className="text-xl font-semibold">Text Block</h2>
      </div>
      <div className="relative py-4">
        <div className="space-y-4 px-4">
          <div>
            <Label
              htmlFor="hrefField"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Link
            </Label>
            <TextInput
              id="hrefField"
              type="url"
              inputProps={{
                name: `blocks.${selectedBlockIndex}.attributes.href` as 'blocks.0.attributes.href',
                control,
              }}
              errorClassName="mt-1 text-xs text-red-500"
            />
          </div>
          <div>
            <Label
              htmlFor="fontSizeField"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Font Size
            </Label>
            <FontSizeSelect
              id="fontSizeField"
              inputProps={{
                name: `blocks.${selectedBlockIndex}.attributes.fontSize` as 'blocks.0.attributes.fontSize',
                control,
              }}
              errorClassName="mt-1 text-xs text-red-500"
            />
          </div>
          <div>
            <Label
              htmlFor="lineHeightField"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Line Height
            </Label>
            <LineHeightSelect
              id="lineHeightField"
              inputProps={{
                name: `blocks.${selectedBlockIndex}.attributes.lineHeight` as 'blocks.0.attributes.lineHeight',
                control,
              }}
              errorClassName="mt-1 text-xs text-red-500"
            />
          </div>
          <div className="mb-4 grid grid-flow-row grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="innerPaddingTopField"
                className="mb-1 block text-sm font-semibold text-gray-700"
              >
                Padding Top
              </Label>
              <PaddingSelect
                id="innerPaddingTopField"
                inputProps={{
                  name: `blocks.${selectedBlockIndex}.attributes.innerPaddingTop` as 'blocks.0.attributes.innerPaddingTop',
                  control,
                }}
                errorClassName="mt-1 text-xs text-red-500"
              />
            </div>
            <div>
              <Label
                htmlFor="innerPaddingRightField"
                className="mb-1 block text-sm font-semibold text-gray-700"
              >
                Padding Right
              </Label>
              <PaddingSelect
                id="innerPaddingRightField"
                inputProps={{
                  name: `blocks.${selectedBlockIndex}.attributes.innerPaddingRight` as 'blocks.0.attributes.innerPaddingRight',
                  control,
                }}
                errorClassName="mt-1 text-xs text-red-500"
              />
            </div>
            <div>
              <Label
                htmlFor="innerPaddingBottomField"
                className="mb-1 block text-sm font-semibold text-gray-700"
              >
                Padding Bottom
              </Label>
              <PaddingSelect
                id="innerPaddingBottomField"
                inputProps={{
                  name: `blocks.${selectedBlockIndex}.attributes.innerPaddingBottom` as 'blocks.0.attributes.innerPaddingBottom',
                  control,
                }}
                errorClassName="mt-1 text-xs text-red-500"
              />
            </div>
            <div>
              <Label
                htmlFor="innerPaddingLeftField"
                className="mb-1 block text-sm font-semibold text-gray-700"
              >
                Padding Left
              </Label>
              <PaddingSelect
                id="innerPaddingLeftField"
                inputProps={{
                  name: `blocks.${selectedBlockIndex}.attributes.innerPaddingLeft` as 'blocks.0.attributes.innerPaddingLeft',
                  control,
                }}
                errorClassName="mt-1 text-xs text-red-500"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="textColorField"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Text Color
            </Label>
            <ColorInput
              id="textColorField"
              inputProps={{
                name: `blocks.${selectedBlockIndex}.attributes.color` as 'blocks.0.attributes.color',
                control,
              }}
            />
          </div>
          <div>
            <Label
              htmlFor="backgroundColorField"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Button Color
            </Label>
            <ColorInput
              id="backgroundColorField"
              inputProps={{
                name: `blocks.${selectedBlockIndex}.attributes.backgroundColor` as 'blocks.0.attributes.backgroundColor',
                control,
              }}
            />
          </div>
        </div>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="container-style" className="border-t">
            <AccordionTrigger className="px-4 text-base">
              Container Style
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 px-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="paddingTopField"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      Padding Top
                    </Label>
                    <PaddingSelect
                      id="paddingTopField"
                      inputProps={{
                        name: `blocks.${selectedBlockIndex}.attributes.paddingTop` as 'blocks.0.attributes.paddingTop',
                        control,
                      }}
                      errorClassName="mt-1 text-xs text-red-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="paddingRightField"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      Padding Right
                    </Label>
                    <PaddingSelect
                      id="paddingRightField"
                      inputProps={{
                        name: `blocks.${selectedBlockIndex}.attributes.paddingRight` as 'blocks.0.attributes.paddingRight',
                        control,
                      }}
                      errorClassName="mt-1 text-xs text-red-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="paddingBottomField"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      Padding Bottom
                    </Label>
                    <PaddingSelect
                      id="paddingBottomField"
                      inputProps={{
                        name: `blocks.${selectedBlockIndex}.attributes.paddingBottom` as 'blocks.0.attributes.paddingBottom',
                        control,
                      }}
                      errorClassName="mt-1 text-xs text-red-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="paddingLeftField"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      Padding Left
                    </Label>
                    <PaddingSelect
                      id="paddingLeftField"
                      inputProps={{
                        name: `blocks.${selectedBlockIndex}.attributes.paddingLeft` as 'blocks.0.attributes.paddingLeft',
                        control,
                      }}
                      errorClassName="mt-1 text-xs text-red-500"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="containerBackgroundColorField"
                    className="mb-1 block text-sm font-semibold text-gray-700"
                  >
                    Background Color
                  </Label>
                  <ColorInput
                    id="containerBackgroundColorField"
                    inputProps={{
                      name: `blocks.${selectedBlockIndex}.attributes.containerBackgroundColor` as 'blocks.0.attributes.containerBackgroundColor',
                      control,
                    }}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
