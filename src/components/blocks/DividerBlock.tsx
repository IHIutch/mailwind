import { type z } from 'zod'

import { type DividerBlockSchema } from '@/utils/zod/schemas'

type DividerProps = z.infer<typeof DividerBlockSchema>

export default function DividerBlock({ attributes }: DividerProps) {
  return (
    <div
      style={{
        paddingTop: attributes.paddingTop,
        paddingBottom: attributes.paddingBottom,
        paddingLeft: attributes.paddingLeft,
        paddingRight: attributes.paddingRight,
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
