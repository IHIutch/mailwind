import { json } from '@remix-run/node'
import { prismaPutTemplate } from '~/utils/prisma/templates.server'

export async function action({ request, params }) {
  try {
    const formData = await request.formData()
    const payload = Object.fromEntries(formData)

    const data = prismaPutTemplate(
      {
        id: params.templateId,
      },
      { ...payload }
    )

    return json(data, 200)
  } catch (error) {
    return json({ error: error.message }, 400)
  }
}
