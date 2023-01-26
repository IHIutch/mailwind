import * as Label from '@radix-ui/react-label'
import { useFormContext } from 'react-hook-form'
import { useActiveBlockState } from '@/context/activeBlock'
import ColorInput from '../inputs/ColorInput'
import FontSizeInput from '../inputs/FontSizeInput'
import LineHeightInput from '../inputs/LineHeightInput'
import PaddingInput from '../inputs/PaddingInput'

export default function TextSidebar({ heading }) {
  const { data: activeBlock } = useActiveBlockState()
  const { control } = useFormContext()

  return (
    <div>
      <div>{heading}</div>
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
            name={`blocks.${activeBlock.index}.attributes.fontSize`}
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
            name={`blocks.${activeBlock.index}.attributes.lineHeight`}
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
              name={`blocks.${activeBlock.index}.attributes.paddingTop`}
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
              name={`blocks.${activeBlock.index}.attributes.paddingRight`}
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
              name={`blocks.${activeBlock.index}.attributes.paddingBottom`}
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
              name={`blocks.${activeBlock.index}.attributes.paddingLeft`}
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
            name={`blocks.${activeBlock.index}.attributes.backgroundColor`}
            control={control}
          />
        </div>
      </div>
    </div>
  )
}
