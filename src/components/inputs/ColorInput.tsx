import * as Popover from '@radix-ui/react-popover'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Palette } from 'lucide-react'
import { HexColorPicker } from 'react-colorful'
import { type Control, useController } from 'react-hook-form'

export default function ColorInput({
  id,
  name,
  control,
  className,
  errorClassName,
}: {
  id: string
  name: string
  control: Control
  className?: string
  errorClassName?: string
}) {
  const {
    field: { onChange, name: inputName, value, ref },
    fieldState: { error },
  } = useController({
    name,
    defaultValue: '#ffffff',
    control,
    rules: {
      required: true,
    },
  })

  return (
    <div className="flex h-[42px]">
      <div className="h-full grow">
        <InputColorPicker value={value} onChange={onChange} />
      </div>
      <div className="h-full">
        <SwatchColorPicker value={value} onChange={onChange} />
      </div>
    </div>
  )
}

const InputColorPicker = ({
  value,
  onChange,
}: {
  value: string
  onChange: () => void
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger className="h-full w-full rounded-l-md border border-zinc-300 py-2 px-3 text-left shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 [&[data-state=open]]:border-indigo-300 [&[data-state=open]]:ring [&[data-state=open]]:ring-indigo-200">
        <div className="flex items-center">
          <div
            className="h-4 w-4 rounded border"
            style={{ backgroundColor: value }}
          />
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

const SwatchColorPicker = ({
  value,
  onChange,
}: {
  value: string
  onChange: () => void
}) => {
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
      <Popover.Trigger className="h-full w-full rounded-r-md border border-l-0 border-zinc-300 py-2 px-3 text-left shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50 [&[data-state=open]]:border-l [&[data-state=open]]:border-indigo-300 [&[data-state=open]]:ring [&[data-state=open]]:ring-indigo-200">
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
