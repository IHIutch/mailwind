import * as ToggleGroup from '@radix-ui/react-toggle-group'
import * as Popover from '@radix-ui/react-popover'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as Label from '@radix-ui/react-label'
import { Controller, useFormContext } from 'react-hook-form'
import { AlignCenter, AlignLeft, AlignRight, Palette } from 'lucide-react'
import { HexColorPicker } from 'react-colorful'

export default function GlobalSidebar({ heading }) {
  const { control, register } = useFormContext()

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
        <input
          {...register('global.containerWidth')}
          id="globalWidthField"
          type="text"
          className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="border-t border-zinc-200 px-3 pt-4">
        <div className="mb-1">
          <span className="text-sm font-semibold text-zinc-700">
            Text Color
          </span>
        </div>
        <div className="flex h-[42px]">
          <div className="grow">
            <Controller
              name={'global.color'}
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputColorPicker value={value} onChange={onChange} />
              )}
            />
          </div>
          <div className="h-full">
            <Controller
              name={'global.color'}
              control={control}
              render={({ field: { value, onChange } }) => (
                <SwatchColorPicker value={value} onChange={onChange} />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const InputColorPicker = ({ value, onChange }) => {
  return (
    <Popover.Root>
      <Popover.Trigger className="w-full rounded-l-md border border-zinc-300 py-2 px-3 text-left shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 [&[data-state=open]]:border-indigo-300 [&[data-state=open]]:ring [&[data-state=open]]:ring-indigo-200">
        <div className="flex items-center">
          <div className="h-4 w-4 rounded" style={{ backgroundColor: value }} />
          <span className="ml-2">{value}</span>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={4}
          className="rounded-lg border bg-white p-1 shadow-lg"
        >
          <HexColorPicker color={value} onChange={onChange} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

const SwatchColorPicker = ({ value, onChange }) => {
  const colorsList = [
    { label: 'zinc.50', value: '#fafafa' },
    { label: 'zinc.100', value: '#f5f5f5' },
    { label: 'zinc.200', value: '#e5e5e5' },
    { label: 'zinc.300', value: '#d4d4d8' },
    { label: 'zinc.400', value: '#a1a1aa' },
    { label: 'zinc.500', value: '#71717a' },
    { label: 'zinc.600', value: '#52525b' },
    { label: 'zinc.700', value: '#3f3f46' },
    { label: 'zinc.800', value: '#262626' },
    { label: 'zinc.900', value: '#171717' },
  ]

  return (
    <Popover.Root>
      <Popover.Trigger className="h-full w-full rounded-r-md border border-l-0 border-zinc-300 py-2 px-3 text-left shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 [&[data-state=open]]:border-l [&[data-state=open]]:border-indigo-300 [&[data-state=open]]:ring [&[data-state=open]]:ring-indigo-200">
        <Palette className="h-4 w-4" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={4}
          className="max-h-48 w-fit overflow-y-auto rounded-lg border bg-white p-3 shadow-lg"
        >
          <RadioGroup.Root
            value={value}
            onValueChange={onChange}
            className="grid grid-flow-row grid-cols-5 gap-2"
          >
            {colorsList.map((color, idx) => (
              <RadioGroup.Item
                key={idx}
                value={color.value}
                className="h-8 w-8 rounded-full [&[data-state=checked]]:ring-2 [&[data-state=checked]]:ring-indigo-700 [&[data-state=checked]]:ring-offset-2"
                style={{
                  backgroundColor: color.value,
                }}
              ></RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
