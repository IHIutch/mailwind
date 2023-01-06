import { redirect } from '@remix-run/node'
import { prismaPostTemplate } from '~/utils/prisma/templates.server'
import { createServerClient } from '~/utils/supabase.server'

export const action = async ({ request }) => {
  const response = new Response()
  const supabase = createServerClient({ request, response })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null // return unauthorized error
  }

  const template = await prismaPostTemplate({ membershipId: 123 })

  return redirect(`/templates/${template.id}`)
}
