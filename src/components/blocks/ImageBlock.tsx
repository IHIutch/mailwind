import { Image as ImageIcon } from 'lucide-react'
import { type z } from 'zod'

import { type ImageBlockSchema } from '@/utils/zod/schemas'

type ImageBlockAttributes = z.infer<typeof ImageBlockSchema>

export default function ImageBlock({
  attributes,
}: {
  attributes: ImageBlockAttributes['attributes']
}) {
  return (
    <div
      style={{
        paddingTop: attributes.paddingTop,
        paddingRight: attributes.paddingRight,
        paddingBottom: attributes.paddingBottom,
        paddingLeft: attributes.paddingLeft,
        backgroundColor: attributes.backgroundColor,
      }}
    >
      {attributes?.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="h-full w-full object-cover"
          style={{
            height: attributes.height,
            width: attributes.width,
          }}
          src={attributes.src}
          alt={attributes.alt}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-md border border-zinc-200 bg-zinc-100">
          <ImageIcon className="h-16 w-16 text-zinc-300" />
        </div>
      )}
    </div>
  )
}
