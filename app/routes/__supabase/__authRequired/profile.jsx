import { json } from '@remix-run/node'
import { useLoaderData, useTransition, Link } from '@remix-run/react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { Plus } from 'lucide-react'
import GlobalNavbar from '~/components/GlobalNavbar'
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

  return (
    <div className="h-full bg-neutral-50">
      <GlobalNavbar />
      <div className="pt-16">
        <div className="container-lg mx-auto py-12 px-4">
          <h1 className="mb-8 text-3xl font-bold">Your Templates</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <TemplateLink pathname="/templates/new">
              <div className="flex h-full items-center justify-center">
                <div>
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200">
                    <Plus className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-medium">New Template</span>
                </div>
              </div>
            </TemplateLink>
            {templates.map((template, idx) => (
              <TemplateLink key={idx} pathname={`/templates/${template.id}`}>
                <div className="h-32 w-full bg-neutral-300" />
                <div className="p-4">
                  <div className="mb-0.5">
                    <span className="text-lg font-medium">
                      {template.title ?? 'Untitled'}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    <span>Last Modified: </span>
                    <span>{dayjs(template.updatedAt).format('MMM D')}</span>
                  </div>
                </div>
              </TemplateLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const TemplateLink = ({ pathname, children }) => {
  const transition = useTransition()
  const isLoading =
    transition.state === 'loading' && transition.location.pathname === pathname

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded border border-gray-200 bg-white shadow-sm transition-all',
        'hover:-translate-y-1 hover:shadow-md'
      )}
    >
      <Link className="after:absolute after:inset-0" to={pathname}>
        {isLoading ? <span>Loading...</span> : children}
      </Link>
    </div>
  )
}
