import { Image as ImageIcon } from 'lucide-react'
import { type ImageBlockProps } from 'types/block.types'

export default function ImageBlock({
  attributes,
}: {
  attributes: ImageBlockProps['attributes']
}) {
  return (
    <div
      style={{
        paddingTop: attributes.paddingTop,
        paddingRight: attributes.paddingRight,
        paddingBottom: attributes.paddingBottom,
        paddingLeft: attributes.paddingLeft,
        backgroundColor: attributes.containerBackgroundColor,
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
