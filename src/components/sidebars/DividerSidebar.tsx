import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import { useSelectedBlockState } from '@/context/selectedBlock'
import { type DefaultFormValues } from '@/pages/templates/[id]'
import BorderWidthSelect from '../inputs/BorderWidthSelect'
import ColorInput from '../inputs/ColorInput'
import PaddingSelect from '../inputs/PaddingSelect'
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
    <div className={clsx('relative', className)}>
      {closeButton}
      <div className="mb-4 px-3">
        <h2 className="font-semibold">Divider Block</h2>
      </div>
      <div className="relative px-3">
        <div className="mb-4 grid grid-flow-row grid-cols-2 gap-4">
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
        <div className="mb-4">
          <Label
            htmlFor="borderWidthField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Border Width
          </Label>
          <BorderWidthSelect
            id="borderWidthField"
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.borderTopWidth` as 'blocks.0.attributes.borderTopWidth',
              control,
            }}
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="borderColorField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Border Color
          </Label>
          <ColorInput
            id="borderColorField"
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.borderTopColor` as 'blocks.0.attributes.borderTopColor',
              control,
            }}
          />
        </div>
      </div>
    </div>
  )
}
