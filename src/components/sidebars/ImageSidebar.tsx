import { type ReactNode } from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import { useSelectedBlockState } from '@/context/selectedBlock'
import { type DefaultFormValues } from '@/pages/templates/[id]'
import * as Label from '@radix-ui/react-label'
import LinkInput from '../inputs/LinkInput'
import PaddingInput from '../inputs/PaddingInput'
import SpacingInput from '../inputs/SpacingInput'

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
      <div className="mb-4 px-3">
        <h2 className="font-semibold">Image Block</h2>
      </div>
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
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.height` as 'blocks.0.attributes.height',
              control,
            }}
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
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.width` as 'blocks.0.attributes.width',
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
            htmlFor="urlField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Image Link
          </Label.Root>
          <LinkInput
            id="urlField"
            inputProps={{
              name: `blocks.${selectedBlockIndex}.attributes.url` as 'blocks.0.attributes.url',
              control,
            }}
            errorClassName="mt-1 text-xs text-red-500"
          />
        </div>
      </div>
    </div>
  )
}
