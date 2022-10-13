import { createCookieSessionStorage } from '@remix-run/node'
import { prismaPostUser } from './prisma/users.server'
import { createStripeCustomer } from './stripe/index.server'

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: 'sb:token',
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      secure: true,
      secrets: ['s3cret1'],
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
  return user
}
