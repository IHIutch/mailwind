import * as Select from '@radix-ui/react-select'
import * as Label from '@radix-ui/react-label'
import { ChevronDown } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

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

  const { register, formState, setValue } = useFormContext()

  const { errors } = formState

  console.log({ errors, formState })

  const handleShiftSpinner = (e, callback) => {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault()

      const match = e.target.value.match(/(^-?\d+)(\S+|)$/)
      const value = match?.[1] || 0
      const unit = match?.[2] || ''

      const currentValue = isNaN(value) ? 0 : parseInt(value)

      const dir = e.key === 'ArrowUp' ? 1 : -1
      const modifier = e.shiftKey ? 10 : 1

      callback(currentValue + dir * modifier + unit)
    }
  }

  return (
    <div>
      <div>{heading}</div>
      <div className="relative px-3">
        {/* <Label.Root
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
            <Select.Content className="z-10 rounded-md border border-zinc-200 bg-white px-1 shadow-lg"> */}
        {/* <Select.ScrollUpButton>up</Select.ScrollUpButton> */}
        {/* <Select.Viewport className="py-1">
                {options.map((value, idx) => (
                  <Select.Item
                    key={idx}
                    value={value}
                    className="cursor-pointer rounded py-1.5 px-2 outline-none hover:bg-indigo-100 focus:bg-indigo-100  [&[data-state=checked]]:bg-indigo-500 [&[data-state=checked]]:text-white [&[data-state=checked]]:hover:bg-indigo-600 [&[data-state=checked]]:focus:bg-indigo-600"
                  >
                    <Select.ItemText>{value}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport> */}
        {/* <Select.ScrollDownButton>down</Select.ScrollDownButton> */}
        {/* </Select.Content>
          </Select.Portal>
        </Select.Root> */}
        <div>
          <Label.Root
            htmlFor="fontSizeField"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            Font Size
          </Label.Root>
          <input
            id="fontSizeField"
            className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            onKeyDown={(e) => {
              handleShiftSpinner(e, (value) => {
                setValue('some.test', value, {
                  shouldDirty: true,
                  shouldValidate: true,
                  shouldTouch: true,
                })
              })
            }}
            {...register('some.test', {
              validate: {
                isNumber: (v) => {
                  const value = v.match(/^-?\d+/)?.[0]
                  if (isNaN(value)) return `Value must be a number`
                },
                isPositive: (v) => {
                  const value = v.match(/^-?\d+/)?.[0]
                  if (parseInt(value) < 0) return `Value cannot be negative`
                },
                isFormatted: (v) => {
                  const value = v.match(/^-?\d+(\S+|)$/)
                  if (!value) return 'Value formatted incorrectly'
                },
                isUnitSupported: (v) => {
                  const unit = v.match(/^-?\d+(\S+|)$/)?.[1] || ''
                  if (unit && unit !== 'px' && unit !== '%')
                    return `Unit '${unit}' is not supported`
                },
              },
            })}
          />
          {errors ? (
            <p className="mt-1 text-sm text-red-500">
              {errors?.some?.test?.message}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
