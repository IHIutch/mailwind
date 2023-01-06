import { json } from '@remix-run/node'
import {
  useOutletContext,
  useLoaderData,
  useSubmit,
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
  const submit = useSubmit()
  const transition = useTransition()

  // const handleLogout = async () => {
  //   const { error } = await supabase.auth.signOut()
  //   if (error) {
  //     console.log({ error })
  //   }
  // }

  const createNewTemplate = async () => {
    submit(null, { method: 'post', action: '/api/new-template' })
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Profile</h1>
      <div>
        <span>Welcome, {user.email}</span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <button
          onClick={createNewTemplate}
          disabled={transition.state !== 'idle'}
          className="border border-gray-200 h-32 rounded flex items-center justify-center shadow"
        >
          {transition.type !== 'normalLoad' && transition.state !== 'idle' ? (
            <span>Creating...</span>
          ) : (
            <span>New Template</span>
          )}
        </button>
        {templates.map((template, idx) => (
          <div
            className="border border-gray-200 h-32 rounded flex items-center justify-center shadow relative"
            key={idx}
          >
            <Link
              className="after:absolute after:inset-0"
              to={`/templates/${template.id}`}
            >
              <span>{template.id}</span>
              <span>{template.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
