import { type ReactNode } from 'react'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

import { useAuthUser } from '@/utils/query/user'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropdownMenu'

export default function GlobalNavbar({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  const { data: user } = useAuthUser()

  return (
    <div
      className={`${className}
      fixed inset-x-0 top-0 z-10 h-16 border-b border-zinc-200 bg-white px-8`}
    >
      <div className="container-xl mx-auto flex h-full items-center px-4">
        <div>
          <Link href="/profile" className="text-xl font-bold">
            Mailwind
          </Link>
        </div>

        {children ? <div>{children}</div> : null}

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                <span className="font-medium uppercase text-white">
                  {(user?.email || '').substring(0, 1)}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <LogOut className="h-4 w-4" />
                <Link href="/logout" className="pl-2 font-medium">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
