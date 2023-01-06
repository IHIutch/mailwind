import { Link } from '@remix-run/react'

export default function index() {
  return (
    <div>
      <Link to="/login">Login</Link> <Link to="/demo">Demo</Link>
    </div>
  )
}
