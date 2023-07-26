// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const { z } = require('zod')

/*eslint sort-keys: "error"*/
const envSchema = z.object({
  DB_CONNECTION_STRING: z.string().url(),
  //
  // NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  //
  NODE_ENV: z.enum(['development', 'test', 'production']),
  //
  STRIPE_MONTHLY_PLAN_ID: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_SIGNING_SECRET: z.string().min(1),
  //
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(env.error.format(), null, 4)
  )
  process.exit(1)
}
module.exports.env = env.data
