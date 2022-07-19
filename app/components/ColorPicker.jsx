import React, { useCallback, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

export default function ColorPicker({ value, onChange }) {
  const popover = useRef()
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => setIsOpen(false), [])

  return (
    <div className="relative">
      <button
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-0.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        onClick={() => setIsOpen(true)}
      >
        <div
          className="z-0 h-8 rounded-lg"
          style={{ backgroundColor: value }}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-full z-10 rounded shadow"
          ref={popover}
        >
          <HexColorPicker color={value} onChange={onChange} />
        </div>
      )}
    </div>
  )
}
