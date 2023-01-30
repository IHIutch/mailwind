import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function GlobalNavbar({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  const { isLoading, session, error } = useSessionContext()

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
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                <span className="font-medium uppercase text-white">
                  {(session?.user.email || '').substring(0, 1)}
                </span>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                className="z-20 w-40 rounded-md border border-zinc-200 bg-white py-2 shadow-lg"
              >
                {/* <DropdownMenu.Item className="flex cursor-pointer items-center py-1 px-2 outline-none hover:bg-zinc-100">
                  <Link to="/account">Account</Link>
                </DropdownMenu.Item> */}
                <DropdownMenu.Item className="flex cursor-pointer items-center py-1 px-2 outline-none hover:bg-zinc-100">
                  <LogOut className="h-4 w-4" />
                  <Link href="/logout" className="pl-2 font-medium">
                    Logout
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  )
}
