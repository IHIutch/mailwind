import getMjMl from '~/models/getMjml.server'

export async function action({ request }) {
  const formData = await request.formData()
  const json = formData.get('json')

  const { html, errors } = getMjMl(JSON.parse(json))

  return {
    html,
    errors,
  }
}
