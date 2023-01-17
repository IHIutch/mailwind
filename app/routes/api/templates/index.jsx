import { json } from '@remix-run/node'

export async function action({ request }) {
  try {
    const formData = await request.formData()
    const payload = Object.fromEntries(formData)
    console.log({ payload })

    return json({ ok: true }, 200)
  } catch (error) {
    return json({ error: error.message }, 400)
  }
}
