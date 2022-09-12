import { blocks } from '~/utils/types'

export default function Block({ type, attributes, value, onChange }) {
  const Component = blocks[type]
  return (
    <Component
      type={type}
      attributes={attributes}
      value={value}
      onChange={onChange}
    />
  )
}

// function keyDownHandler(event) {
//   if (event.key === 'ArrowUp') {
//     if (menu.value?.open) {
//       event.preventDefault()
//     }
//     // If at first line, move to previous block
//     else if (atFirstLine()) {
//       event.preventDefault()
//       // emit('moveToPrevLine')
//     }
//   } else if (event.key === 'ArrowDown') {
//     if (menu.value?.open) {
//       event.preventDefault()
//     }
//     // If at last line, move to next block
//     else if (atLastLine()) {
//       event.preventDefault()
//       // emit('moveToNextLine')
//     }
//   } else if (event.key === 'ArrowLeft') {
//     // If at first character, move to previous block
//     if (atFirstChar()) {
//       event.preventDefault()
//       // emit('moveToPrevChar')
//     }
//   } else if (event.key === 'ArrowRight') {
//     // If at last character, move to next block
//     if (atLastChar()) {
//       event.preventDefault()
//       // emit('moveToNextChar')
//     }
//   } else if (event.key === 'Backspace' && highlightedLength() === 0) {
//     if (!(menu.value && menu.value.open) && atFirstChar()) {
//       event.preventDefault()
//       // emit('merge')
//     }
//   } else if (event.key === 'Enter') {
//     event.preventDefault()
//     if (!(menu.value && menu.value.open)) {
//       // emit('split')
//     }
//   }
// }
