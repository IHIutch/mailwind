import { json } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import withAuthUser from '~/utils/supabase/withAuthUser'

export const loader = withAuthUser(async ({ supabaseClient, authUser }) => {
  try {
    return json({ authUser })
  } catch (error) {
    console.log({ error })
    return json({ error: error.message })
  }
})

export default function Profile() {
  const { authUser, error } = useLoaderData()

  console.log({ error, authUser })

  return (
    <div>
      <pre>{JSON.stringify(authUser, null, 2)}</pre>
      <div>{error ? error : null}</div>
    </div>
  )
}
