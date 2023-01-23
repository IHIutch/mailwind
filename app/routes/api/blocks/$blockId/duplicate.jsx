import { json } from '@remix-run/node'
import {
  prismaGetBlock,
  prismaGetBlocks,
  prismaPostBlock,
  prismaPutBlocks,
} from '~/utils/prisma/blocks.server'

export async function action({ request, params }) {
  try {
    const blockToDuplicate = await prismaGetBlock({ id: params.blockId })
    const createdBlock = await prismaPostBlock({
      templateId: blockToDuplicate.templateId,
      position: blockToDuplicate.position + 1,
      type: blockToDuplicate.type,
      value: blockToDuplicate.value,
      attributes: blockToDuplicate.attributes,
    })

    const templateBlocks = await prismaGetBlocks({
      templateId: createdBlock.templateId,
    })

    let newBlocks = templateBlocks.filter((tb) => tb.id !== createdBlock.id)
    newBlocks.splice(createdBlock.position, 0, createdBlock)

    const newOrder = newBlocks.map((nb, idx) => ({ id: nb.id, position: idx }))

    await prismaPutBlocks(newOrder)
    return json(createdBlock, 200)
  } catch (error) {
    console.error(error)
    return json({ error: error.message }, 400)
  }
}
