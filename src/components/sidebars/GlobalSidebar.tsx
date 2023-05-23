import { type ReactNode } from 'react'
import clsx from 'clsx'
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import * as Label from '@radix-ui/react-label'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import ColorInput from '../inputs/ColorInput'
import SpacingInput from '../inputs/SpacingInput'

export default function GlobalSidebar({
  className,
  closeButton,
}: {
  className?: string
  closeButton?: ReactNode
}) {
  const { control } = useFormContext<DefaultFormValues>()

  return (
    <div className={clsx('relative', className)}>
      <div className="mb-4 border-b px-3 pb-3">
        <h2 className="text-xl font-semibold">Global Attributes</h2>
      </div>
      <div className="mb-4 px-3">
        <fieldset>
          <Label.Root htmlFor="containerAlignField" asChild>
            <legend className="mb-1 block text-sm font-semibold text-gray-700">
              Container Align
            </legend>
          </Label.Root>
          <Controller
            name={'global.containerAlign'}
            control={control}
            render={({ field: { value, onChange } }) => (
              <ToggleGroup.Root
                id="containerAlignField"
                type="single"
                value={value}
                onValueChange={(value) => (value ? onChange(value) : null)}
                className="inline-flex h-10 rounded-md shadow-sm"
              >
                <ToggleGroup.Item
                  value="left"
                  className="rounded-l-md border border-r-0 border-zinc-300 px-2 py-1 font-bold text-zinc-500 hover:bg-indigo-50 [&[data-state=on]]:border-indigo-100 [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600"
                >
                  <AlignLeft className="h-5 w-5" />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="center"
                  className="border border-x-0 border-zinc-300 px-2 py-1 font-bold text-zinc-500 hover:bg-indigo-50 [&[data-state=on]]:border-indigo-100 [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600"
                >
                  <AlignCenter className="h-5 w-5" />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="right"
                  className="rounded-r-md border border-l-0 border-zinc-300 px-2 py-1 font-bold text-zinc-500 hover:bg-indigo-50 [&[data-state=on]]:border-indigo-100 [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600"
                >
                  <AlignRight className="h-5 w-5" />
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            )}
          />
        </fieldset>
      </div>
      <div className="mb-4 px-3">
        <Label.Root
          className="mb-1 text-sm font-semibold text-zinc-700"
          htmlFor="globalWidthField"
        >
          Container Width
        </Label.Root>
        <SpacingInput
          id="globalWidthField"
          inputProps={{
            name: `global.containerWidth`,
            control,
          }}
        />
      </div>
      <div className="border-t border-zinc-200 px-3 pt-4">
        <Label.Root
          className="mb-1 text-sm font-semibold text-zinc-700"
          htmlFor="globalBackgroundColorField"
        >
          Background Color
        </Label.Root>
        <ColorInput
          id="globalBackgroundColorField"
          inputProps={{
            name: 'global.backgroundColor',
            control,
          }}
        />
      </div>
    </div>
  )
}
