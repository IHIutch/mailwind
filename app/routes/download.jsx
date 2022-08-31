import { json } from '@remix-run/node'
import getMjMl from '~/models/getMjml.server'

export async function action({ request }) {
  try {
    const formData = await request.formData()
    const data = formData.get('json')

    console.log({ data })

    const html = getMjMl(JSON.parse(data))

    return json({ html }, 200)
  } catch (error) {
    return json({ error: error.message }, 400)
  }
}
