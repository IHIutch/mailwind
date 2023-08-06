import React, { type ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import { useSelectedBlockState } from '@/context/selectedBlock'
import { type DefaultFormValues } from '@/pages/templates/[id]'
import { cn } from '@/utils/functions'
import BorderWidthSelect from '../inputs/BorderWidthSelect'
import ColorInput from '../inputs/ColorInput'
import PaddingSelect from '../inputs/PaddingSelect'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/Accordion'
import { Label } from '../ui/Label'

export default function DividerSidebar({
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
        <h2 className="text-xl font-semibold">Divider Block</h2>
      </div>
      <div className="relative py-4">
        <div className="space-y-4 px-4">
          <div>
            <Label
              htmlFor="borderWidthField"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Border Width
            </Label>
            <BorderWidthSelect
              id="borderWidthField"
              inputProps={{
                name: `blocks.${selectedBlockIndex}.attributes.borderWidth` as 'blocks.0.attributes.borderWidth',
                control,
              }}
            />
          </div>
          <div>
            <Label
              htmlFor="borderTopColorField"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Border Color
            </Label>
            <ColorInput
              id="borderTopColorField"
              inputProps={{
                name: `blocks.${selectedBlockIndex}.attributes.borderColor` as 'blocks.0.attributes.borderColor',
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
                    htmlFor="backgroundColorField"
                    className="mb-1 block text-sm font-semibold text-gray-700"
                  >
                    Background Color
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
