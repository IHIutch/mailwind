import { ChevronDown } from 'lucide-react'
import { useController, type UseControllerProps } from 'react-hook-form'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import * as Select from '@radix-ui/react-select'

const fontWeightOptions = [
  { value: '100', label: 'Thin' },
  { value: '200', label: 'Extra Light' },
  { value: '300', label: 'Light' },
  { value: '400', label: 'Normal' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semibold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' },
  { value: '900', label: 'Black' },
]

export default function FontWeightInput({
  id,
  inputProps,
  className,
  errorClassName,
}: {
  id: string
  inputProps: UseControllerProps<DefaultFormValues>
  className?: string
  errorClassName?: string
}) {
  const {
    field: { onChange, name: inputName, value, ref },
    fieldState: { error },
  } = useController({
    ...inputProps,
    rules: {
      required: 'This field is required',
    },
  })

  return (
    <div>
      <Select.Root
        id={id}
        className={className}
        onValueChange={onChange}
        value={value}
        name={inputName}
        ref={ref}
        aria-describedby={error ?? `${id}-error-message`}
        aria-invalid={error ? 'true' : 'false'}
      >
        <Select.Trigger
          id="fontWeightField"
          className="flex w-full items-center rounded-md border border-zinc-300 px-3 py-2 text-left shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 [&[data-state=open]]:border-indigo-300 [&[data-state=open]]:ring [&[data-state=open]]:ring-indigo-200"
        >
          <Select.Value placeholder="Select a value..." />
          <Select.Icon className="ml-auto">
            <ChevronDown className="h-4 w-4" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="z-10 rounded-md border border-zinc-200 bg-white px-1 shadow-lg">
            <Select.ScrollUpButton>up</Select.ScrollUpButton>
            <Select.Viewport className="py-1">
              {fontWeightOptions.map(({ value, label }, idx) => (
                <Select.Item
                  key={idx}
                  value={value}
                  className="cursor-pointer select-none rounded px-2 py-1.5 outline-none hover:bg-indigo-100  focus:bg-indigo-100 [&[data-state=checked]]:bg-indigo-500 [&[data-state=checked]]:text-white [&[data-state=checked]]:hover:bg-indigo-600 [&[data-state=checked]]:focus:bg-indigo-600"
                >
                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton>down</Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {error ? (
        <p id={`${id}-error-message`} className={errorClassName}>
          {error?.message}
        </p>
      ) : null}
    </div>
  )
}
