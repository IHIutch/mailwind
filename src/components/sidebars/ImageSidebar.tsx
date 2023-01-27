import LinkInput from '../inputs/LinkInput'
import PaddingInput from '../inputs/PaddingInput'
import SpacingInput from '../inputs/SpacingInput'
import { useActiveBlockState } from '@/context/activeBlock'
import * as Label from '@radix-ui/react-label'
import { useFormContext } from 'react-hook-form'

export default function ImageSidebar({ heading }) {
  const { data: activeBlock } = useActiveBlockState()
  const { control } = useFormContext()
  return (
    <div>
      <div>{heading}</div>
      <div className="relative px-3">
        <div className="mb-4">
          <Label.Root
            htmlFor="heightInputField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Image Height
          </Label.Root>
          <SpacingInput
            id="heightInputField"
            name={`blocks.${activeBlock.index}.attributes.height`}
            control={control}
            className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
            errorClassName="mt-1 text-xs text-red-500"
          />
        </div>
        <div className="mb-4">
          <Label.Root
            htmlFor="widthInputField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Image Width
          </Label.Root>
          <SpacingInput
            id="widthInputField"
            name={`blocks.${activeBlock.index}.attributes.width`}
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
            htmlFor="urlField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Image Link
          </Label.Root>
          <LinkInput
            id="urlField"
            name={`blocks.${activeBlock.index}.attributes.url`}
            control={control}
            className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
            errorClassName="mt-1 text-xs text-red-500"
          />
        </div>
      </div>
    </div>
  )
}
