import { useFetcher } from '@remix-run/react'
import CodeMirror from '@uiw/react-codemirror'
import { useEffect, useState } from 'react'
import { json as cmJson } from '@codemirror/lang-json'
import getHtml from '../models/getHtml.server'

export default function Index() {
  const fetcher = useFetcher()
  const [code, setCode] = useState(`{
  "tagName": "mjml",
  "attributes": {},
  "children": [
    {
      "tagName": "mj-body",
      "attributes": {},
      "children": [
        {
          "tagName": "mj-section",
          "attributes": {},
          "children": [
            {
              "tagName": "mj-column",
              "attributes": {},
              "children": [
                {
                  "tagName": "mj-image",
                  "attributes": {
                    "width": "100px",
                    "src": "/assets/img/logo-small.png"
                  }
                },
                {
                  "tagName": "mj-divider",
                  "attributes": {
                    "border-color": "#F46E43"
                  }
                },
                {
                  "tagName": "mj-button",
                  "attributes": {
                    "background-color": "#F46E43",
                    "font-size": "16px",
                    "font-weight": "bold",
                    "align": "center",
                    "padding": "10px",
                    "color": "#ffffff",
                    "border-radius": "3px",
                    "href": "https://www.mjml.io/try-mjml/"
                  },
                  "content": "Press me"
                },
                {
                  "tagName": "mj-text",
                  "attributes": {
                    "font-size": "20px",
                    "color": "#F45E43",
                    "font-family": "Helvetica"
                  },
                  "content": "Hello World"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
`)

  useEffect(() => {
    try {
      if (code) {
        const obj = JSON.parse(code)
        fetcher.submit({ json: JSON.stringify(obj) }, { method: 'post' })
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        throw error
      }
    }
  }, [code])

  return (
    <div className="flex h-screen">
      <div className="grow">
        <CodeMirror
          height="100%"
          style={{ height: '100%' }}
          extensions={[cmJson()]}
          value={code}
          onChange={setCode}
        />
        {/* <fetcher.Form method="post" action="/?index">
          <input type="hidden" name="json" value={JSON.stringify(json)} />
          <button
            // type="submit"
            onClick={() => {
              fetcher.submit(null, { method: "post" });
            }}
          >
            Submit
          </button>
        </fetcher.Form> */}
      </div>
      <div className="h-full grow">
        {fetcher.data ? (
          <div dangerouslySetInnerHTML={{ __html: fetcher.data }} />
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  const json = formData.get('json')

  const html = getHtml(JSON.parse(json))
  return html
}
