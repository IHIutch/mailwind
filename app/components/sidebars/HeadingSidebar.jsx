import * as Select from '@radix-ui/react-select'
import * as Label from '@radix-ui/react-label'
import { ChevronDown } from 'lucide-react'

export default function HeadingSidebar({ heading }) {
  const options = [
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-3xl',
    'text-4xl',
    'text-5xl',
    'text-6xl',
    'text-7xl',
    'text-8xl',
    'text-9xl',
  ]
  return (
    <div>
      <div>{heading}</div>
      <div className="relative px-3">
        <Label.Root
          htmlFor="textFontSizeField"
          className="mb-1 block text-sm font-semibold text-gray-700"
        >
          Font Size
        </Label.Root>
        <Select.Root defaultValue="text-base">
          <Select.Trigger
            id="textFontSizeField"
            className="flex w-full items-center rounded-md border border-zinc-300 py-2 px-3 text-left shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 [&[data-state=open]]:border-indigo-300 [&[data-state=open]]:ring [&[data-state=open]]:ring-indigo-200"
          >
            <Select.Value placeholder="Select a value..." />
            <Select.Icon className="ml-auto">
              <ChevronDown className="h-4 w-4" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-10 rounded-md border border-zinc-200 bg-white px-1 shadow-lg">
              {/* <Select.ScrollUpButton>up</Select.ScrollUpButton> */}
              <Select.Viewport className="py-1">
                {options.map((value, idx) => (
                  <Select.Item
                    key={idx}
                    value={value}
                    className="cursor-pointer rounded py-1.5 px-2 outline-none hover:bg-indigo-100 focus:bg-indigo-100  [&[data-state=checked]]:bg-indigo-500 [&[data-state=checked]]:text-white [&[data-state=checked]]:hover:bg-indigo-600 [&[data-state=checked]]:focus:bg-indigo-600"
                  >
                    <Select.ItemText>{value}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
              {/* <Select.ScrollDownButton>down</Select.ScrollDownButton> */}
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  )
}
