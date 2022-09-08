import { useState } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { CacheProvider } from '@emotion/react'
import { RemixBrowser } from '@remix-run/react'
import createEmotionCache from './createEmotionCache'
import { ClientStyleContext } from './context'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function ClientCacheProvider({ children }) {
  const [cache, setCache] = useState(createEmotionCache())

  function reset() {
    setCache(createEmotionCache())
  }

  const queryClient = new QueryClient()
  const dehydratedState = window.__REACT_QUERY_STATE__

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <CacheProvider value={cache}>{children}</CacheProvider>
        </Hydrate>
        {/* This is not working for some reason */}
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </QueryClientProvider>
    </ClientStyleContext.Provider>
  )
}

hydrateRoot(
  document,
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>
)
