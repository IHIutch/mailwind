import { json } from '@remix-run/node'
import {
  prismaGetBlocks,
  prismaPostBlock,
  prismaPutBlocks,
} from '~/utils/prisma/blocks.server'

export async function action({ request, params }) {
  try {
    const formData = await request.formData()
    const { payload } = Object.fromEntries(formData)

    const createdBlock = await prismaPostBlock(JSON.parse(payload))
    const templateBlocks = await prismaGetBlocks({
      templateId: createdBlock.templateId,
    })

    const newBlocks = templateBlocks
      .filter((tb) => tb.id !== createdBlock.id)
      .splice(createdBlock.position, 0, createdBlock)

    const newOrder = newBlocks.map((nb, idx) => ({ id: nb.id, position: idx }))

    await prismaPutBlocks(newOrder)
    return json(createdBlock, 200)
  } catch (error) {
    console.error(error)
    return json({ error: error.message }, 400)
  }
}
