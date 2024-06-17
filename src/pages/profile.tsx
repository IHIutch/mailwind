import { type ReactNode } from 'react'
import dayjs from 'dayjs'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import GlobalNavbar from '@/components/GlobalNavbar'
import { useGetTemplatesByMembershipId } from '@/utils/query/templates'
import { useAuthUser } from '@/utils/query/user'

export default function Profile() {
  const { data: user } = useAuthUser()
  const { data: templates } = useGetTemplatesByMembershipId(
    user?.memberships?.[0]?.id
  )

  return (
    <div className="h-full bg-neutral-50">
      <GlobalNavbar className="shadow-sm" />
      <div className="pt-16">
        <div className="container-xl mx-auto px-4 py-12">
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
            {templates
              ? templates.map((template, idx) => (
                  <TemplateLink
                    key={idx}
                    pathname={`/templates/${template.id}`}
                  >
                    <div className="h-32 w-full bg-neutral-300" />
                    <div className="p-4">
                      <div className="mb-0.5">
                        <span className="text-lg font-medium">
                          {template.title ?? 'Untitled Template'}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        <span>Last Updated: </span>
                        <span>
                          {dayjs(template?.fullUpdatedAt).format('MMM D')}
                        </span>
                      </div>
                    </div>
                  </TemplateLink>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

const TemplateLink = ({
  pathname,
  children,
}: {
  pathname: string
  children: ReactNode
}) => {
  return (
    <div
      className="hover:-tranzinc-y-1 relative overflow-hidden rounded border border-gray-200 bg-white shadow-sm
      transition-all hover:shadow-md"
    >
      <Link className="after:absolute after:inset-0" href={pathname}>
        {children}
      </Link>
    </div>
  )
}
