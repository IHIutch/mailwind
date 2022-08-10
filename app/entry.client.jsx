import React from 'react'
import { hydrate } from 'react-dom'
import { CacheProvider } from '@emotion/react'
import { RemixBrowser } from '@remix-run/react'
import createEmotionCache from './createEmotionCache'
import { ClientStyleContext } from './context'

function ClientCacheProvider({ children }) {
  const [cache, setCache] = React.useState(createEmotionCache())

  function reset() {
    setCache(createEmotionCache())
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

hydrate(
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>,
  document
)
