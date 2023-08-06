import { useCallback, useState } from 'react'
import { X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

import { cn } from '@/utils/functions'

export default function ImageDropzone({ onChange, value = '' }) {
  const [preview, setPreview] = useState(value)
  const onDrop = useCallback(
    (acceptedFiles) => {
      const objectUrl = URL.createObjectURL(acceptedFiles[0])
      onChange(objectUrl)
      setPreview(objectUrl)
    },
    [onChange]
  )

  const handleClearImage = () => {
    onChange('')
    setPreview('')
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    // isDragAccept,
    // isDragReject,
  } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  })

  return (
    <div className="flex overflow-hidden rounded-md">
      {preview ? (
        <div className="relative h-full w-full">
          <button
            className="absolute right-2 top-2 h-8 w-8 rounded"
            onClick={handleClearImage}
          >
            <X className="h-4 w-4" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="h-full w-full object-cover" src={preview} alt="" />
        </div>
      ) : (
        <div
          className={cn(
            'flex h-full w-full cursor-pointer items-center justify-center border text-center font-semibold transition-colors',
            isDragActive
              ? 'border-indigo-200 bg-indigo-100'
              : 'border-zinc-200 bg-zinc-100'
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Upload an Image</p>
          )}
        </div>
      )}
    </div>
  )
}
