import { json } from '@remix-run/node'
import {
  useOutletContext,
  useLoaderData,
  useTransition,
  Link,
} from '@remix-run/react'
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
    <div className="container-lg mx-auto">
      <h1 className="text-2xl">Profile</h1>
      <div>
        <span>Welcome, {user.email}</span>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
        <TemplateLink pathname="/templates/new">
          <span>New Template</span>
        </TemplateLink>
        {templates.map((template, idx) => (
          <TemplateLink key={idx} pathname={`/templates/${template.id}`}>
            <span>{template.title ?? 'Untitled'}</span>
          </TemplateLink>
        ))}
      </div>
    </div>
  )
}

const TemplateLink = ({ pathname, children }) => {
  const transition = useTransition()
  const isLoading =
    transition.state === 'loading' && transition.location.pathname === pathname

  return (
    <div className="border border-gray-200 h-32 rounded flex items-center justify-center shadow relative">
      <Link className="after:absolute after:inset-0" to={pathname}>
        {isLoading ? <span>Loading...</span> : children}
      </Link>
    </div>
  )
}
