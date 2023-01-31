import ColorInput from '../inputs/ColorInput'
import FontSizeInput from '../inputs/FontSizeInput'
import LineHeightInput from '../inputs/LineHeightInput'
import PaddingInput from '../inputs/PaddingInput'
import * as Label from '@radix-ui/react-label'
import { useFormContext } from 'react-hook-form'
import { type ReactNode } from 'react'

export default function TextSidebar({ children }: { children: ReactNode }) {
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
            name="attributes.fontSize"
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
            name="attributes.lineHeight"
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
              name="attributes.paddingTop"
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
              name="attributes.paddingRight"
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
              name="attributes.paddingBottom"
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
              name="attributes.paddingLeft"
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
            name="attributes.backgroundColor"
            control={control}
          />
        </div>
      </div>
    </div>
  )
}
