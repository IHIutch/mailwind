import { type DividerBlockProps } from 'types/block.types'

export default function DividerBlock({
  attributes,
}: {
  attributes: DividerBlockProps['attributes']
}) {
  return (
    <div
      style={{
        paddingTop: attributes.paddingTop,
        paddingBottom: attributes.paddingBottom,
        paddingLeft: attributes.paddingLeft,
        paddingRight: attributes.paddingRight,
        backgroundColor: attributes.containerBackgroundColor,
      }}
    >
      <hr
        style={{
          borderTopWidth: attributes.borderWidth,
          borderTopColor: attributes.borderColor,
        }}
      />
    </div>
  )
}
