import React, { useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

export default function ColorPicker({ label, value, onChange }) {
  const popover = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const [color, setColor] = useState(value)

  // const close = useCallback(() => setIsOpen(false), [])

  return (
    <div className="relative">
      <label className="mb-2 text-sm font-medium text-gray-900">{label}</label>
      <button
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-0.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className="z-0 h-8 rounded-lg"
          style={{ backgroundColor: color }}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-full z-10 rounded shadow"
          ref={popover}
        >
          <HexColorPicker
            color={color}
            onChange={(value) => {
              setColor(value)
              onChange(value)
            }}
          />
        </div>
      )}
    </div>
  )
}
