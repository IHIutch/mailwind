import React from 'react'
import Editor from '../Editor'

export default function TextBlock({ details, onChange }) {
  const handleChange = (value) => {
    onChange({
      ...details,
      value,
    })
  }
  return <Editor value={details.value} onChange={handleChange} />
}
