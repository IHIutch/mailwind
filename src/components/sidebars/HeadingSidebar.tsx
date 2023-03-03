import ColorInput from '../inputs/ColorInput'
import FontSizeInput from '../inputs/FontSizeInput'
import FontWeightInput from '../inputs/FontWeightInput'
import LineHeightInput from '../inputs/LineHeightInput'
import PaddingInput from '../inputs/PaddingInput'
import * as Label from '@radix-ui/react-label'
import { useFormContext } from 'react-hook-form'
import { type ReactNode } from 'react'
import { type DefaultFormValues } from '@/pages/templates/[id]'
import { useSelectedBlockState } from '@/context/selectedBlock'

export default function HeadingSidebar({ children }: { children: ReactNode }) {
  const { data: selectedBlockIndex } = useSelectedBlockState()
  const { control } = useFormContext<DefaultFormValues>()

  return (
    <div>
      <div>{children}</div>
      <div className="relative px-3">
        <div className="mb-4">
          <Label.Root
            htmlFor="fontSizeField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Font Size
          </Label.Root>
          <FontSizeInput
            id="fontSizeField"
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.fontSize` as 'blocks.0.attributes.fontSize',
              control,
            }}
            errorClassName="mt-1 text-xs text-red-500"
          />
        </div>
        <div className="mb-4">
          <Label.Root
            htmlFor="lineHeightField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Line Height
          </Label.Root>
          <LineHeightInput
            id="lineHeightField"
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.lineHeight` as 'blocks.0.attributes.lineHeight',
              control,
            }}
            errorClassName="mt-1 text-xs text-red-500"
          />
        </div>
        <div className="mb-4">
          <Label.Root
            htmlFor="fontWeightField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Font Weight
          </Label.Root>
          <FontWeightInput
            id="fontWeightField"
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.fontWeight` as 'blocks.0.attributes.fontWeight',
              control,
            }}
            errorClassName="mt-1 text-xs text-red-500"
          />
        </div>
        <div className="mb-4 grid grid-flow-row grid-cols-2 gap-4">
          <div>
            <Label.Root
              htmlFor="paddingTopField"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Padding Top
            </Label.Root>
            <PaddingInput
              id="paddingTopField"
              inputProps={{
                name: `blocks.${selectedBlockIndex}.attributes.paddingTop` as 'blocks.0.attributes.paddingTop',
                control,
              }}
              errorClassName="mt-1 text-xs text-red-500"
            />
          </div>
          <div>
            <Label.Root
              htmlFor="paddingRightField"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Padding Right
            </Label.Root>
            <PaddingInput
              id="paddingRightField"
              inputProps={{
                name: `blocks.${selectedBlockIndex}.attributes.paddingRight` as 'blocks.0.attributes.paddingRight',
                control,
              }}
              errorClassName="mt-1 text-xs text-red-500"
            />
          </div>
          <div>
            <Label.Root
              htmlFor="paddingBottomField"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Padding Bottom
            </Label.Root>
            <PaddingInput
              id="paddingBottomField"
              inputProps={{
                name: `blocks.${selectedBlockIndex}.attributes.paddingBottom` as 'blocks.0.attributes.paddingBottom',
                control,
              }}
              errorClassName="mt-1 text-xs text-red-500"
            />
          </div>
          <div>
            <Label.Root
              htmlFor="paddingLeftField"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Padding Left
            </Label.Root>
            <PaddingInput
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
          <Label.Root
            htmlFor="backgroundColorField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Background Color
          </Label.Root>
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
