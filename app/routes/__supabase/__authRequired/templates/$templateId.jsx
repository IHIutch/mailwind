import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prismaGetTemplate } from '~/utils/prisma/templates.server'

export const loader = async ({ params }) => {
  const response = new Response()
  const template = await prismaGetTemplate({ id: params.templateId })

  return json(
    { template },
    {
      headers: response.headers,
    }
  )
}

export default function TemplateId() {
  const { template } = useLoaderData()
  return (
    <div>
      <pre>{JSON.stringify(template, null, 2)}</pre>
    </div>
  )
}
