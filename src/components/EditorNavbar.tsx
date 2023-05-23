import { Send } from 'lucide-react'

import * as Label from '@radix-ui/react-label'
import * as Popover from '@radix-ui/react-popover'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

export default function EditorNavbar({
  handleDownload,
  previewSize,
  setPreviewSize,
}: {
  handleDownload?: () => void
  previewSize: string
  setPreviewSize: (value: 'mobile' | 'desktop') => void
}) {
  const handleSendEmail = () => {
    console.log('send email')
  }

  return (
    <div className="absolute inset-x-0 z-10 flex h-12 border-b border-zinc-200 bg-white px-8 shadow-sm">
      <div className="absolute inset-x-0 z-0 flex h-full items-center justify-center">
        <ToggleGroup.Root
          id="containerAlignField"
          type="single"
          value={previewSize}
          onValueChange={(value: 'desktop' | 'mobile') =>
            value ? setPreviewSize(value) : null
          }
          className="flex h-8 rounded-md shadow-sm"
        >
          <ToggleGroup.Item
            value="desktop"
            className="rounded-l-md border border-r-0 border-zinc-300 px-2 text-sm font-semibold text-zinc-500 hover:bg-indigo-50 [&[data-state=on]]:border-indigo-100 [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600"
          >
            Desktop
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="mobile"
            className="rounded-r-md border border-l-0 border-zinc-300 px-2 text-sm font-semibold text-zinc-500 hover:bg-indigo-50 [&[data-state=on]]:border-indigo-100 [&[data-state=on]]:bg-indigo-100 [&[data-state=on]]:text-indigo-600"
          >
            Mobile
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
      <div className="relative ml-auto flex items-center">
        <Button size="sm" onClick={handleDownload}>
          Download
        </Button>
        <div className="ml-2">
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button variant="outline" disabled>
                Send Test
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                align="end"
                sideOffset={1}
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
                  <Input
                    id="emailToSendField"
                    type="email"
                    placeholder="Your Email..."
                  />
                  <Button size="sm" onClick={handleSendEmail}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
    </div>
  )
}
