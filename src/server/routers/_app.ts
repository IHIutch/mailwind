import { router } from '../trpc'
import { blockRouter } from './blocks'
import { templateRouter } from './templates'
import { userRouter } from './user'

export const appRouter = router({
  block: blockRouter,
  template: templateRouter,
  user: userRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
