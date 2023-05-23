import { Palette } from 'lucide-react'
import { HexColorPicker } from 'react-colorful'
import { useController, type UseControllerProps } from 'react-hook-form'

import { type DefaultFormValues } from '@/pages/templates/[id]'
import * as Popover from '@radix-ui/react-popover'
import * as RadioGroup from '@radix-ui/react-radio-group'

export default function ColorInput({
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
      <Popover.Trigger className="&[data-state=open]]:border-indigo-300 &[data-state=open]]:ring &[data-state=open]]:ring-indigo-200 h-full w-full rounded-l-md border border-zinc-300 px-3 py-2 text-left shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200">
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

const colorsList = [
  {
    label: 'Slate',
    values: [
      { label: 50, value: '#f8fafc' },
      { label: 100, value: '#f1f5f9' },
      { label: 200, value: '#e2e8f0' },
      { label: 300, value: '#cbd5e1' },
      { label: 400, value: '#94a3b8' },
      { label: 500, value: '#64748b' },
      { label: 600, value: '#475569' },
      { label: 700, value: '#334155' },
      { label: 800, value: '#1e293b' },
      { label: 900, value: '#0f172a' },
      { label: 950, value: '#020617' },
    ],
  },
  {
    label: 'Gray',
    values: [
      { label: 50, value: '#f9fafb' },
      { label: 100, value: '#f3f4f6' },
      { label: 200, value: '#e5e7eb' },
      { label: 300, value: '#d1d5db' },
      { label: 400, value: '#9ca3af' },
      { label: 500, value: '#6b7280' },
      { label: 600, value: '#4b5563' },
      { label: 700, value: '#374151' },
      { label: 800, value: '#1f2937' },
      { label: 900, value: '#111827' },
      { label: 950, value: '#030712' },
    ],
  },
  {
    label: 'Zinc',
    values: [
      { label: 50, value: '#fafafa' },
      { label: 100, value: '#f4f4f5' },
      { label: 200, value: '#e4e4e7' },
      { label: 300, value: '#d4d4d8' },
      { label: 400, value: '#a1a1aa' },
      { label: 500, value: '#71717a' },
      { label: 600, value: '#52525b' },
      { label: 700, value: '#3f3f46' },
      { label: 800, value: '#27272a' },
      { label: 900, value: '#18181b' },
      { label: 950, value: '#09090b' },
    ],
  },
  {
    label: 'Neutral',
    values: [
      { label: 50, value: '#fafafa' },
      { label: 100, value: '#f5f5f5' },
      { label: 200, value: '#e5e5e5' },
      { label: 300, value: '#d4d4d4' },
      { label: 400, value: '#a3a3a3' },
      { label: 500, value: '#737373' },
      { label: 600, value: '#525252' },
      { label: 700, value: '#404040' },
      { label: 800, value: '#262626' },
      { label: 900, value: '#171717' },
      { label: 950, value: '#0a0a0a' },
    ],
  },
  {
    label: 'Stone',
    values: [
      { label: 50, value: '#fafaf9' },
      { label: 100, value: '#f5f5f4' },
      { label: 200, value: '#e7e5e4' },
      { label: 300, value: '#d6d3d1' },
      { label: 400, value: '#a8a29e' },
      { label: 500, value: '#78716c' },
      { label: 600, value: '#57534e' },
      { label: 700, value: '#44403c' },
      { label: 800, value: '#292524' },
      { label: 900, value: '#1c1917' },
      { label: 950, value: '#0c0a09' },
    ],
  },
  {
    label: 'Red',
    values: [
      { label: 50, value: '#fef2f2' },
      { label: 100, value: '#fee2e2' },
      { label: 200, value: '#fecaca' },
      { label: 300, value: '#fca5a5' },
      { label: 400, value: '#f87171' },
      { label: 500, value: '#ef4444' },
      { label: 600, value: '#dc2626' },
      { label: 700, value: '#b91c1c' },
      { label: 800, value: '#991b1b' },
      { label: 900, value: '#7f1d1d' },
      { label: 950, value: '#450a0a' },
    ],
  },
  {
    label: 'Orange',
    values: [
      { label: 50, value: '#fff7ed' },
      { label: 100, value: '#ffedd5' },
      { label: 200, value: '#fed7aa' },
      { label: 300, value: '#fdba74' },
      { label: 400, value: '#fb923c' },
      { label: 500, value: '#f97316' },
      { label: 600, value: '#ea580c' },
      { label: 700, value: '#c2410c' },
      { label: 800, value: '#9a3412' },
      { label: 900, value: '#7c2d12' },
      { label: 950, value: '#431407' },
    ],
  },
  {
    label: 'Amber',
    values: [
      { label: 50, value: '#fffbeb' },
      { label: 100, value: '#fef3c7' },
      { label: 200, value: '#fde68a' },
      { label: 300, value: '#fcd34d' },
      { label: 400, value: '#fbbf24' },
      { label: 500, value: '#f59e0b' },
      { label: 600, value: '#d97706' },
      { label: 700, value: '#b45309' },
      { label: 800, value: '#92400e' },
      { label: 900, value: '#78350f' },
      { label: 950, value: '#451a03' },
    ],
  },
  {
    label: 'Yellow',
    values: [
      { label: 50, value: '#fefce8' },
      { label: 100, value: '#fef9c3' },
      { label: 200, value: '#fef08a' },
      { label: 300, value: '#fde047' },
      { label: 400, value: '#facc15' },
      { label: 500, value: '#eab308' },
      { label: 600, value: '#ca8a04' },
      { label: 700, value: '#a16207' },
      { label: 800, value: '#854d0e' },
      { label: 900, value: '#713f12' },
      { label: 950, value: '#422006' },
    ],
  },
  {
    label: 'Lime',
    values: [
      { label: 50, value: '#f7fee7' },
      { label: 100, value: '#ecfccb' },
      { label: 200, value: '#d9f99d' },
      { label: 300, value: '#bef264' },
      { label: 400, value: '#a3e635' },
      { label: 500, value: '#84cc16' },
      { label: 600, value: '#65a30d' },
      { label: 700, value: '#4d7c0f' },
      { label: 800, value: '#3f6212' },
      { label: 900, value: '#365314' },
      { label: 950, value: '#1a2e05' },
    ],
  },
  {
    label: 'Green',
    values: [
      { label: 50, value: '#f0fdf4' },
      { label: 100, value: '#dcfce7' },
      { label: 200, value: '#bbf7d0' },
      { label: 300, value: '#86efac' },
      { label: 400, value: '#4ade80' },
      { label: 500, value: '#22c55e' },
      { label: 600, value: '#16a34a' },
      { label: 700, value: '#15803d' },
      { label: 800, value: '#166534' },
      { label: 900, value: '#14532d' },
      { label: 950, value: '#052e16' },
    ],
  },
  {
    label: 'Emerald',
    values: [
      { label: 50, value: '#ecfdf5' },
      { label: 100, value: '#d1fae5' },
      { label: 200, value: '#a7f3d0' },
      { label: 300, value: '#6ee7b7' },
      { label: 400, value: '#34d399' },
      { label: 500, value: '#10b981' },
      { label: 600, value: '#059669' },
      { label: 700, value: '#047857' },
      { label: 800, value: '#065f46' },
      { label: 900, value: '#064e3b' },
      { label: 950, value: '#022c22' },
    ],
  },
  {
    label: 'Teal',
    values: [
      { label: 50, value: '#f0fdfa' },
      { label: 100, value: '#ccfbf1' },
      { label: 200, value: '#99f6e4' },
      { label: 300, value: '#5eead4' },
      { label: 400, value: '#2dd4bf' },
      { label: 500, value: '#14b8a6' },
      { label: 600, value: '#0d9488' },
      { label: 700, value: '#0f766e' },
      { label: 800, value: '#115e59' },
      { label: 900, value: '#134e4a' },
      { label: 950, value: '#042f2e' },
    ],
  },
  {
    label: 'Cyan',
    values: [
      { label: 50, value: '#ecfeff' },
      { label: 100, value: '#cffafe' },
      { label: 200, value: '#a5f3fc' },
      { label: 300, value: '#67e8f9' },
      { label: 400, value: '#22d3ee' },
      { label: 500, value: '#06b6d4' },
      { label: 600, value: '#0891b2' },
      { label: 700, value: '#0e7490' },
      { label: 800, value: '#155e75' },
      { label: 900, value: '#164e63' },
      { label: 950, value: '#083344' },
    ],
  },
  {
    label: 'Sky',
    values: [
      { label: 50, value: '#f0f9ff' },
      { label: 100, value: '#e0f2fe' },
      { label: 200, value: '#bae6fd' },
      { label: 300, value: '#7dd3fc' },
      { label: 400, value: '#38bdf8' },
      { label: 500, value: '#0ea5e9' },
      { label: 600, value: '#0284c7' },
      { label: 700, value: '#0369a1' },
      { label: 800, value: '#075985' },
      { label: 900, value: '#0c4a6e' },
      { label: 950, value: '#082f49' },
    ],
  },
  {
    label: 'Blue',
    values: [
      { label: 50, value: '#eff6ff' },
      { label: 100, value: '#dbeafe' },
      { label: 200, value: '#bfdbfe' },
      { label: 300, value: '#93c5fd' },
      { label: 400, value: '#60a5fa' },
      { label: 500, value: '#3b82f6' },
      { label: 600, value: '#2563eb' },
      { label: 700, value: '#1d4ed8' },
      { label: 800, value: '#1e40af' },
      { label: 900, value: '#1e3a8a' },
      { label: 950, value: '#172554' },
    ],
  },
  {
    label: 'Indigo',
    values: [
      { label: 50, value: '#eef2ff' },
      { label: 100, value: '#e0e7ff' },
      { label: 200, value: '#c7d2fe' },
      { label: 300, value: '#a5b4fc' },
      { label: 400, value: '#818cf8' },
      { label: 500, value: '#6366f1' },
      { label: 600, value: '#4f46e5' },
      { label: 700, value: '#4338ca' },
      { label: 800, value: '#3730a3' },
      { label: 900, value: '#312e81' },
      { label: 950, value: '#1e1b4b' },
    ],
  },
  {
    label: 'Violet',
    values: [
      { label: 50, value: '#f5f3ff' },
      { label: 100, value: '#ede9fe' },
      { label: 200, value: '#ddd6fe' },
      { label: 300, value: '#c4b5fd' },
      { label: 400, value: '#a78bfa' },
      { label: 500, value: '#8b5cf6' },
      { label: 600, value: '#7c3aed' },
      { label: 700, value: '#6d28d9' },
      { label: 800, value: '#5b21b6' },
      { label: 900, value: '#4c1d95' },
      { label: 950, value: '#2e1065' },
    ],
  },
  {
    label: 'Purple',
    values: [
      { label: 50, value: '#faf5ff' },
      { label: 100, value: '#f3e8ff' },
      { label: 200, value: '#e9d5ff' },
      { label: 300, value: '#d8b4fe' },
      { label: 400, value: '#c084fc' },
      { label: 500, value: '#a855f7' },
      { label: 600, value: '#9333ea' },
      { label: 700, value: '#7e22ce' },
      { label: 800, value: '#6b21a8' },
      { label: 900, value: '#581c87' },
      { label: 950, value: '#3b0764' },
    ],
  },
  {
    label: 'Fuchsia',
    values: [
      { label: 50, value: '#fdf4ff' },
      { label: 100, value: '#fae8ff' },
      { label: 200, value: '#f5d0fe' },
      { label: 300, value: '#f0abfc' },
      { label: 400, value: '#e879f9' },
      { label: 500, value: '#d946ef' },
      { label: 600, value: '#c026d3' },
      { label: 700, value: '#a21caf' },
      { label: 800, value: '#86198f' },
      { label: 900, value: '#701a75' },
      { label: 950, value: '#4a044e' },
    ],
  },
  {
    label: 'Pink',
    values: [
      { label: 50, value: '#fdf2f8' },
      { label: 100, value: '#fce7f3' },
      { label: 200, value: '#fbcfe8' },
      { label: 300, value: '#f9a8d4' },
      { label: 400, value: '#f472b6' },
      { label: 500, value: '#ec4899' },
      { label: 600, value: '#db2777' },
      { label: 700, value: '#be185d' },
      { label: 800, value: '#9d174d' },
      { label: 900, value: '#831843' },
      { label: 950, value: '#500724' },
    ],
  },
  {
    label: 'Rose',
    values: [
      { label: 50, value: '#fff1f2' },
      { label: 100, value: '#ffe4e6' },
      { label: 200, value: '#fecdd3' },
      { label: 300, value: '#fda4af' },
      { label: 400, value: '#fb7185' },
      { label: 500, value: '#f43f5e' },
      { label: 600, value: '#e11d48' },
      { label: 700, value: '#be123c' },
      { label: 800, value: '#9f1239' },
      { label: 900, value: '#881337' },
      { label: 950, value: '#4c0519' },
    ],
  },
]

const SwatchColorPicker = ({
  value,
  onChange,
}: {
  value: string
  onChange: () => void
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger className="&[data-state=open]]:border-l &[data-state=open]]:border-indigo-300 &[data-state=open]]:ring &[data-state=open]]:ring-indigo-200 h-full w-full rounded-r-md border border-l-0 border-zinc-300 px-3 py-2 text-left shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50">
        <Palette className="h-4 w-4" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={4}
          className="max-h-48 w-fit overflow-y-auto rounded-lg border bg-white px-3 py-1 shadow-lg"
        >
          <RadioGroup.Root value={value} onValueChange={onChange}>
            {colorsList.map((section, idx) => (
              <div key={idx} className="py-2">
                <div className="pb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {section.label}
                  </span>
                </div>
                <div className="grid grid-flow-row grid-cols-5 gap-2">
                  {section.values.map((color, cIdx) => (
                    <RadioGroup.Item
                      key={cIdx}
                      value={color.value}
                      className="h-6 w-6 rounded-full data-[state=checked]:ring-2 data-[state=checked]:ring-indigo-700 data-[state=checked]:ring-offset-2"
                      style={{
                        backgroundColor: color.value,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </RadioGroup.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
