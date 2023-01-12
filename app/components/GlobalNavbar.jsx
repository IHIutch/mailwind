import { Link, useOutletContext } from '@remix-run/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { LogOut } from 'lucide-react'

export default function GlobalNavbar() {
  const { user, supabase } = useOutletContext()

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="fixed inset-x-0 top-0 z-10 h-16 border-b border-zinc-200 bg-white px-8 shadow-sm">
      <div className="container-lg mx-auto flex h-full items-center">
        <div>
          <Link to="/profile" className="text-xl font-bold">
            Mailwind
          </Link>
        </div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
              <span className="text-lg font-medium uppercase text-white">
                {user.email.substring(0, 1)}
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
              <DropdownMenu.Item
                onClick={handleLogout}
                className="flex cursor-pointer items-center py-1 px-2 outline-none hover:bg-zinc-100"
              >
                <LogOut className="h-4 w-4" />
                <span className="pl-2 font-medium">Logout</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  )
}
