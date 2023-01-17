import { json } from '@remix-run/node'
import { prismaPutBlock } from '~/utils/prisma/blocks.server'

export async function action({ request, params }) {
  try {
    const formData = await request.formData()
    const { payload } = Object.fromEntries(formData)

    console.log(JSON.parse(payload))

    const data = await prismaPutBlock(
      {
        id: params.blockId,
      },
      JSON.parse(payload)
    )

    return json(data, 200)
  } catch (error) {
    console.error(error)
    return json({ error: error.message }, 400)
  }
}
