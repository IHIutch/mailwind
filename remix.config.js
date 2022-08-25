/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: 'vercel',
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
  serverDependenciesToBundle: [
    'lowlight',
    'fault',
    'hast-util-to-html',
    'property-information',
    'html-void-elements',
    'hast-util-is-element',
    'unist-util-is',
    'hast-util-whitespace',
    'space-separated-tokens',
    'comma-separated-tokens',
    'stringify-entities',
    'character-entities-legacy',
    'character-entities-html4',
    'ccount',
  ],
}
