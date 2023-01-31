import LinkInput from '../inputs/LinkInput'
import PaddingInput from '../inputs/PaddingInput'
import SpacingInput from '../inputs/SpacingInput'
import * as Label from '@radix-ui/react-label'
import { useFormContext } from 'react-hook-form'
import { type ReactNode } from 'react'

export default function ImageSidebar({ children }: { children: ReactNode }) {
  const { control } = useFormContext()
  return (
    <div>
      <div>{children}</div>
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
            name={'attributes.height'}
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
            name={'attributes.width'}
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
              name={'attributes.paddingTop'}
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
              name={'attributes.paddingRight'}
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
              name={'attributes.paddingBottom'}
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
              name={'attributes.paddingLeft'}
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
            name={'attributes.url'}
            control={control}
            className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
            errorClassName="mt-1 text-xs text-red-500"
          />
        </div>
      </div>
    </div>
  )
}
