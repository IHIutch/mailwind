import { redirect } from '@remix-run/node'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const { event } = Object.fromEntries(formData)

  if (event === 'SIGNED_IN') {
    return redirect('/profile')
  } else if (event === 'SIGNED_OUT') {
    return redirect('/login')
  }

  return null
}
