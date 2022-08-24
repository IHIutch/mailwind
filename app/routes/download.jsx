import { json } from '@remix-run/node'
import getMjMl from '~/models/getMjml.server'

export async function action({ request }) {
  try {
    const formData = await request.formData()
    const data = formData.get('json')

    const { html, errors } = getMjMl(JSON.parse(data))

    if (errors.length > 0) {
      return json({ error: errors }, 400)
    }

    return json({ html }, 200)
  } catch (error) {
    return json({ error: error.message }, 400)
  }
}
