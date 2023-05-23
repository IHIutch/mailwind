import { type ReactNode } from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import { useSelectedBlockState } from '@/context/selectedBlock'
import { type DefaultFormValues } from '@/pages/templates/[id]'
import ColorInput from '../inputs/ColorInput'
import PaddingSelect from '../inputs/PaddingSelect'
import SpacingInput from '../inputs/SpacingInput'
import TextInput from '../inputs/TextInput'
import { Label } from '../ui/Label'

export default function ImageSidebar({
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
      <div className="mb-4 border-b px-3 pb-3">
        <h2 className="text-xl font-semibold">Image Block</h2>
      </div>
      <div className="relative px-3">
        <div className="mb-4">
          <Label
            htmlFor="urlField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Image URL
          </Label>
          <TextInput
            id="urlField"
            type="url"
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.src` as 'blocks.0.attributes.src',
              control,
            }}
            errorClassName="mt-1 text-xs text-red-500"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="altTextField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Alt Text
          </Label>
          <TextInput
            id="altTextField"
            type="text"
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.alt` as 'blocks.0.attributes.alt',
              control,
            }}
            errorClassName="mt-1 text-xs text-red-500"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="heightInputField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Image Height
          </Label>
          <SpacingInput
            id="heightInputField"
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.height` as 'blocks.0.attributes.height',
              control,
            }}
            errorClassName="mt-1 text-xs text-red-500"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="widthInputField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Image Width
          </Label>
          <SpacingInput
            id="widthInputField"
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.width` as 'blocks.0.attributes.width',
              control,
            }}
            errorClassName="mt-1 text-xs text-red-500"
          />
        </div>
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
    </div>
  )
}
