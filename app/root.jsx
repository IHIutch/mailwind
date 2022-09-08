import { ChakraProvider } from '@chakra-ui/react'
import { withEmotionCache } from '@emotion/react'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { useContext, useEffect } from 'react'
import { ClientStyleContext, ServerStyleContext } from './context'

export const meta = () => ({
  charset: 'utf-8',
  title: 'Mailwind',
  viewport: 'width=device-width,initial-scale=1',
})

const Document = withEmotionCache(({ children }, emotionCache) => {
  const serverStyleData = useContext(ServerStyleContext)
  const clientStyleData = useContext(ClientStyleContext)

  // Only executed on client
  useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head
    // re-inject tags
    const tags = emotionCache.sheet.tags
    emotionCache.sheet.flush()
    tags.forEach((tag) => {
      emotionCache.sheet._insertTag(tag)
    })
    // reset cache to reapply global styles
    clientStyleData?.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {serverStyleData?.map(({ key, ids, css }) => (
          <style
            key={key}
            data-emotion={`${key} ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        ))}
      </head>
      <body>
        <ChakraProvider>{children}</ChakraProvider>
        <ScrollRestoration />

        {process.env.NODE_ENV === 'production' ? (
          <script
            src="https://joy-effective.mailwind.app/script.js"
            data-site="NPSQRRYS"
            defer
          />
        ) : null}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
})

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}
