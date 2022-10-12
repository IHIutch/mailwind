import { createCookieSessionStorage } from '@remix-run/node'
import { prismaPostUser } from './prisma/users.server'
import { createStripeCustomer } from './stripe/index.server'

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: 'sb:token',

      // all of these are optional
      expires: new Date(Date.now() + 60),
      httpOnly: true,
      maxAge: 60,
      path: '/',
      sameSite: 'lax',
      secrets: ['s3cret1'],
      secure: true,
    },
  })

export const registerUser = async ({ id, email }) => {
  const stripeCustomer = await createStripeCustomer({
    email,
  })

  const user = await prismaPostUser({
    id,
    stripeCustomerId: stripeCustomer.id,
    role: 'CUSTOMER',
  })
  console.log({ user })
  return user
}
