import { json } from '@remix-run/node'
import {
  prismaDeleteBlock,
  prismaGetBlock,
  prismaGetBlocks,
  prismaPostBlock,
  prismaPutBlocks,
} from '~/utils/prisma/blocks.server'

export async function action({ request, params }) {
  try {
    const deletedBlock = await prismaDeleteBlock({ id: params.blockId })

    const templateBlocks = await prismaGetBlocks({
      templateId: deletedBlock.templateId,
    })

    const newOrder = templateBlocks.map((nb, idx) => ({
      id: nb.id,
      position: idx,
    }))

    await prismaPutBlocks(newOrder)
    return json(deletedBlock, 200)
  } catch (error) {
    console.error(error)
    return json({ error: error.message }, 400)
  }
}
