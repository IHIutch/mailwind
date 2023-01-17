import { Send, X } from 'lucide-react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import * as Popover from '@radix-ui/react-popover'
import * as Label from '@radix-ui/react-label'
import * as Dialog from '@radix-ui/react-dialog'

export default function EditorNavbar({
  handleDownload,
  previewSize,
  setPreviewSize,
  title,
}) {
  const handleSendEmail = () => {
    console.log('send email')
  }

  return (
    <div className="relative flex h-12 border-b border-zinc-200 bg-white px-8 shadow-sm">
      <div className="z-10 flex items-center">
        <Dialog.Root>
          <Dialog.Trigger>
            <span className="font-semibold">
              {title || 'Untitled Template'}
            </span>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 flex items-start justify-center bg-neutral-900/90">
              <Dialog.Content className="relative my-16 flex w-full max-w-[28rem] flex-col rounded-md bg-white">
                <header className="p-4">
                  <Dialog.Title className="text-2xl font-semibold">
                    Edit Template Title
                  </Dialog.Title>
                </header>
                <Dialog.Close asChild className="absolute top-2 right-3">
                  <button
                    className="rounded-lg bg-neutral-100 p-1 transition-colors
                      hover:bg-neutral-200"
                  >
                    <X />
                  </button>
                </Dialog.Close>
                <form action="">
                  <div className="p-4">
                    <Label.Root
                      htmlFor="template-title"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      Title
                    </Label.Root>
                    <input
                      id="template-title"
                      name="title"
                      type="text"
                      className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
                      // aria-describedby={
                      //   fetcher.data?.error ?? `email-error-message`
                      // }
                      // aria-invalid={fetcher.data?.error ? 'true' : 'false'}
                    />
                    {/* {fetcher.data?.error ? (
                      <p
                        id="email-error-message"
                        className="mt-1 text-xs text-red-500"
                      >
                        {fetcher.data?.error?.message}
                      </p>
                    ) : null} */}
                  </div>
                  <footer className="flex p-4">
                    <div className="ml-auto">
                      <Dialog.Close className="h-8 rounded border border-zinc-300 px-2 text-sm font-semibold text-zinc-500 hover:bg-indigo-50">
                        Cancel
                      </Dialog.Close>
                      <button
                        type="submit"
                        className="ml-2 h-8 rounded bg-indigo-500 px-2 text-sm font-semibold text-white hover:bg-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  </footer>
                </form>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <div className="absolute inset-x-0 z-0 flex h-full items-center justify-center">
        <ToggleGroup.Root
          id="containerAlignField"
          type="single"
          value={previewSize}
          onValueChange={(value) => (value ? setPreviewSize(value) : null)}
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
        <button
          className="h-8 cursor-pointer rounded-md bg-indigo-500 px-2 text-sm font-semibold text-white hover:bg-indigo-600"
          onClick={handleDownload}
        >
          Download
        </button>
        <div className="ml-2">
          <Popover.Root>
            <Popover.Trigger
              className="h-8 rounded-md bg-indigo-100 px-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-200 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-indigo-100"
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
                    className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200/50"
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
