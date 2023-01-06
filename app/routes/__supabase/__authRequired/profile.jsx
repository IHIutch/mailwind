import { json } from '@remix-run/node'
import { useOutletContext, useLoaderData } from '@remix-run/react'
import { prismaGetTemplates } from '~/utils/prisma/templates.server'
import { createServerClient } from '~/utils/supabase.server'

export const loader = async ({ request }) => {
  // in order for the set-cookie header to be set,
  // headers must be returned as part of the loader response
  const response = new Response()
  const supabase = createServerClient({ request, response })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [templates] = await Promise.all([
    await prismaGetTemplates({ userId: user.id }),
  ])

  return json(
    {
      templates,
    },
    {
      headers: response.headers,
    }
  )
}

export default function Profile() {
  const { templates } = useLoaderData()
  const { user } = useOutletContext()

  // const handleLogout = async () => {
  //   const { error } = await supabase.auth.signOut()
  //   if (error) {
  //     console.log({ error })
  //   }
  // }

  return (
    <div>
      <h1>Profile</h1>
      {/* <button onClick={handleLogout}>Logout</button> */}
      <pre>{JSON.stringify({ templates, user }, null, 2)}</pre>;
    </div>
  )
}
