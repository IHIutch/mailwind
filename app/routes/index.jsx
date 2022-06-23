import { useFetcher } from "@remix-run/react";
import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useEffect, useState } from "react";
import { json as cmJson } from "@codemirror/lang-json";
import getHtml from "../models/getHtml.server";

export default function Index() {
  const fetcher = useFetcher();
  const [code, setCode] = useState("");

  useEffect(() => {
    try {
      if (code) {
        const obj = JSON.parse(code);
        fetcher.submit({ json: JSON.stringify(obj) }, { method: "post" });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  }, [code]);

  return (
    <div className="flex h-screen">
      <div className="grow">
        <CodeMirror
          height="100%"
          style={{ height: "100%" }}
          extensions={[cmJson()]}
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
      <div className="grow h-full">
        {fetcher.data ? (
          <div dangerouslySetInnerHTML={{ __html: fetcher.data }} />
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const json = formData.get("json");

  const html = getHtml(JSON.parse(json));
  return html;
}
