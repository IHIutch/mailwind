// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true, // Have to turn off strict mode for react-beautiful-dnd to work
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    }
    return config
  },
}

module.exports = nextConfig

module.exports = withSentryConfig(
  module.exports,
  { silent: true },
  { hideSourcemaps: true }
)
