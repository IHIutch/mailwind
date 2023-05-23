import { type z } from 'zod'

import { type DividerBlockSchema } from '@/utils/zod/schemas'

type DividerBlockAttributes = z.infer<typeof DividerBlockSchema>

export default function DividerBlock({
  attributes,
}: {
  attributes: DividerBlockAttributes['attributes']
}) {
  return (
    <div
      style={{
        paddingTop: attributes.paddingTop,
        paddingBottom: attributes.paddingBottom,
        paddingLeft: attributes.paddingLeft,
        paddingRight: attributes.paddingRight,
        backgroundColor: attributes.backgroundColor,
      }}
    >
      <hr
        style={{
          borderTopWidth: attributes.borderTopWidth,
          borderTopColor: attributes.borderTopColor,
        }}
      />
    </div>
  )
}
