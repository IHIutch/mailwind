import React from 'react'

export default function Input({
  label,
  value,
  defaultValue,
  onChange,
  onBlur,
}) {
  console.log({ value })
  return (
    <div>
      <label className="mb-2 text-sm font-medium text-gray-900">{label}</label>
      <input
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="text"
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => !e.target.value && onBlur()}
      />
    </div>
  )
}
