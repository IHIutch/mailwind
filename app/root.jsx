import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { ActiveBlockProvider } from './context/activeBlock'
import styles from './styles/app.css'

export const meta = () => ({
  charset: 'utf-8',
  title: 'Mailwind',
  viewport: 'width=device-width,initial-scale=1',
})

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export async function loader() {
  return json({
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  })
}

const Document = ({ children }) => {
  const { env } = useLoaderData()
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <ScrollRestoration />

        {process.env.NODE_ENV === 'production' ? (
          <script
            src="https://joy-effective.mailwind.app/script.js"
            data-site="NPSQRRYS"
            defer
          />
        ) : null}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <ActiveBlockProvider>
        <Outlet />
      </ActiveBlockProvider>
    </Document>
  )
}
