import { router } from '../trpc'
import { blockRouter } from './blocks'
import { membershipRouter } from './memberships'
import { organizationRouter } from './organization'
import { templateRouter } from './templates'
import { userRouter } from './user'

export const appRouter = router({
  block: blockRouter,
  template: templateRouter,
  user: userRouter,
  organization: organizationRouter,
  membership: membershipRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
