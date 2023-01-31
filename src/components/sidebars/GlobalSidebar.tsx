import ColorInput from '../inputs/ColorInput'
import SpacingInput from '../inputs/SpacingInput'
import * as Label from '@radix-ui/react-label'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

export default function GlobalSidebar({ heading }) {
  // const { control } = useFormContext()

  return (
    <div>
      {heading}
      <div className="mb-4 px-3">
        <fieldset>
          <Label.Root htmlFor="containerAlignField" asChild>
            <legend className="mb-1 block text-sm font-semibold text-gray-700">
              Container Align
            </legend>
          </Label.Root>
          {/* <Controller
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
                  className="rounded-l-md border border-r-0 border-zinc-300 py-1 px-2 font-bold text-zinc-500 hover:bg-indigo-50 [&[data-state=on]]:border-indigo-100 [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600"
                >
                  <AlignLeft className="h-5 w-5" />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="center"
                  className="border border-x-0 border-zinc-300 py-1 px-2 font-bold text-zinc-500 hover:bg-indigo-50 [&[data-state=on]]:border-indigo-100 [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600"
                >
                  <AlignCenter className="h-5 w-5" />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="right"
                  className="rounded-r-md border border-l-0 border-zinc-300 py-1 px-2 font-bold text-zinc-500 hover:bg-indigo-50 [&[data-state=on]]:border-indigo-100 [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600"
                >
                  <AlignRight className="h-5 w-5" />
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            )}
          /> */}
        </fieldset>
      </div>
      <div className="mb-4 px-3">
        <Label.Root
          className="mb-1 text-sm font-semibold text-zinc-700"
          htmlFor="globalWidthField"
        >
          Container Width
        </Label.Root>
        {/* <SpacingInput
          id="globalWidthField"
          name="global.containerWidth"
          control={control}
          className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
        /> */}
      </div>
      <div className="border-t border-zinc-200 px-3 pt-4">
        <div className="mb-1">
          <span className="text-sm font-semibold text-zinc-700">
            Text Color
          </span>
        </div>
        {/* <ColorInput control={control} name="global.color" /> */}
      </div>
    </div>
  )
}
