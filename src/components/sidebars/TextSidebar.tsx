import ColorInput from '../inputs/ColorInput'
import FontSizeInput from '../inputs/FontSizeInput'
import LineHeightInput from '../inputs/LineHeightInput'
import PaddingInput from '../inputs/PaddingInput'
import * as Label from '@radix-ui/react-label'
import { useFormContext } from 'react-hook-form'
import { useSelectedBlockState } from '@/context/selectedBlock'
import { ReactNode } from 'react'
import { SingleBlockPayloadType } from '@/utils/prisma/blocks'

// type FormValues = {
//   blocks: SingleBlockPayloadType[]
//   global: any
// }

export default function TextSidebar({ children }: { children: ReactNode }) {
  const { data: selectedBlockIndex } = useSelectedBlockState()
  const { control } = useFormContext()

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
            name={
              `blocks.${selectedBlockIndex}.attributes.fontSize` as 'blocks.0.attributes.fontSize'
            }
            control={control}
            className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
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
            name={
              `blocks.${selectedBlockIndex}.attributes.lineHeight` as 'blocks.0.attributes.lineHeight'
            }
            control={control}
            className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
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
              name={
                `blocks.${selectedBlockIndex}.attributes.paddingTop` as 'blocks.0.attributes.paddingTop'
              }
              control={control}
              className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
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
              name={
                `blocks.${selectedBlockIndex}.attributes.paddingRight` as 'blocks.0.attributes.paddingRight'
              }
              control={control}
              className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
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
              name={
                `blocks.${selectedBlockIndex}.attributes.paddingBottom` as 'blocks.0.attributes.paddingBottom'
              }
              control={control}
              className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
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
              name={
                `blocks.${selectedBlockIndex}.attributes.paddingLeft` as 'blocks.0.attributes.paddingLeft'
              }
              control={control}
              className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
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
            name={
              `blocks.${selectedBlockIndex}.attributes.backgroundColor` as 'blocks.0.attributes.backgroundColor'
            }
            control={control}
          />
        </div>
      </div>
    </div>
  )
}
