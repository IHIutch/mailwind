import Link from 'next/link'

export default function index() {
  return (
    <div>
      <Link href="/login">Login</Link> <Link href="/demo">Demo</Link>
    </div>
  )
}
