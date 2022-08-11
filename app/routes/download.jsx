import getHtml from '~/models/getHtml.client'

export async function action({ request }) {
  const formData = await request.formData()
  const json = formData.get('json')

  const html = getHtml(JSON.parse(json))

  return html
}
