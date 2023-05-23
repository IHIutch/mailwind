import { useRef, useState } from 'react'
import { Image, X } from 'lucide-react'

import * as Label from '@radix-ui/react-label'

export default function ImageDropzone({ onChange, value = '', name }) {
  const [preview, setPreview] = useState(value)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef()

  const handleSubmit = () => {
    const isValid = inputRef?.current?.checkValidity()
    if (isValid) {
      onChange(imageUrl)
      setPreview(imageUrl)
      setError('')
    } else {
      setError('Not a valid URL')
    }
  }

  const handleClearImage = () => {
    onChange('')
    setPreview('')
  }
  return (
    <div className="flex overflow-hidden rounded-md">
      {preview ? (
        <div className="relative h-full w-full">
          <button
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded bg-zinc-200 hover:bg-zinc-300"
            onClick={handleClearImage}
          >
            <X className="h-4 w-4" />
          </button>
          <img className="h-full w-full object-cover" src={preview} alt="" />
        </div>
      ) : (
        <div className="flex min-h-[200px] w-full items-center justify-center border border-zinc-200 bg-zinc-100 p-2">
          <Label.Root className="sr-only" htmlFor="imageUrlField">
            Image Link
          </Label.Root>
          <div className="w-full">
            <div className="relative flex items-end">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center px-2">
                <Image className="h-4 w-4" />
              </div>
              <input
                ref={inputRef}
                name={name}
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                type="url"
                id="imageUrlField"
                placeholder="Image URL..."
                className="grow rounded-md border-zinc-300 pl-10 pr-20 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
              />
              <div className="absolute inset-y-0 right-0 flex w-20 items-center justify-center px-1">
                <button
                  onClick={handleSubmit}
                  className="w-full cursor-pointer rounded-md bg-indigo-500 p-2 text-sm font-semibold text-white hover:bg-indigo-600"
                >
                  Submit
                </button>
              </div>
            </div>
            {error ? <p className="mt-1 bg-red-400 text-sm">{error}</p> : null}
          </div>
          {/* <FormControl isInvalid={error}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon boxSize="3.5" as={ImageIcon} />
                </InputLeftElement>
                <Input
                  ref={inputRef}
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  bg="white"
                  type="url"
                />
                <InputRightElement w="auto" px="1">
                  <Button colorScheme="blue" size="sm" onClick={handleSubmit}>
                    Submit
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl> */}
        </div>
      )}
    </div>
  )
}
