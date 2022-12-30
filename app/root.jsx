import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
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

export function ErrorBoundary({ error }) {
  console.log({ error })
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  )
}

const Document = ({ children }) => {
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
