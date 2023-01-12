import { Send } from 'lucide-react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import * as Popover from '@radix-ui/react-popover'
import * as Label from '@radix-ui/react-label'

export default function Navbar({
  handleDownload,
  previewSize,
  setPreviewSize,
}) {
  const handleSendEmail = () => {
    console.log('send email')
  }

  return (
    <div className="fixed inset-x-0 top-0 z-10 flex h-16 border-b border-zinc-200 bg-white px-8 shadow-sm">
      <div className="absolute inset-x-0 flex h-full items-center justify-center">
        <ToggleGroup.Root
          id="containerAlignField"
          type="single"
          value={previewSize}
          onValueChange={(value) => (value ? setPreviewSize(value) : null)}
          className="flex h-8 rounded-md shadow-sm"
        >
          <ToggleGroup.Item
            value="desktop"
            className="rounded-l-md border border-r-0 border-zinc-300 py-0.5 px-2 text-sm font-semibold text-zinc-500 hover:bg-indigo-50 [&[data-state=on]]:border-indigo-100 [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600"
          >
            Desktop
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="mobile"
            className="rounded-r-md border border-l-0 border-zinc-300 py-0.5 px-2 text-sm font-semibold text-zinc-500 hover:bg-indigo-50 [&[data-state=on]]:border-indigo-100 [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600"
          >
            Mobile
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
      <div className="relative ml-auto flex items-center">
        <button
          className="cursor-pointer rounded-md bg-indigo-500 py-2 px-4 font-semibold text-white hover:bg-indigo-600"
          onClick={handleDownload}
        >
          Download
        </button>
        <div className="ml-2">
          <Popover.Root>
            <Popover.Trigger
              className="rounded-md bg-indigo-100 py-2 px-4 font-semibold text-indigo-700 hover:bg-indigo-200 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-indigo-100"
              disabled
            >
              Send Test
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                align="end"
                sideOffset="1"
                className="rounded-md border border-zinc-200 bg-white p-2 shadow-lg"
              >
                <Label.Root
                  // className="mb-1 text-sm font-semibold text-zinc-700"
                  className="sr-only"
                  htmlFor="emailToSendField"
                >
                  Your Email
                </Label.Root>
                <div className="flex items-end">
                  <input
                    id="emailToSendField"
                    type="email"
                    placeholder="Your Email..."
                    className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <button
                    className="ml-2 h-10 cursor-pointer rounded-md bg-indigo-500 px-4 font-semibold text-white hover:bg-indigo-600"
                    onClick={handleSendEmail}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
    </div>
  )
}
