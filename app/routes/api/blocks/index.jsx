import { json } from '@remix-run/node'
import { prismaPostBlock } from '~/utils/prisma/blocks.server'

export async function action({ request }) {
  try {
    const formData = await request.formData()
    const { payload } = Object.fromEntries(formData)

    const data = await prismaPostBlock(JSON.parse(payload))

    return json(data, 200)
  } catch (error) {
    return json({ error: error.message }, 400)
  }
}
