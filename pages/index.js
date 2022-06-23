import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import CodeMirror from "@uiw/react-codemirror";
import { json as cmJson } from "@codemirror/lang-json";

import dynamic from "next/dynamic";
const Preview = dynamic(() => import("../components/preview"), {
  ssr: false,
});

export default function Home() {
  const [code, setCode] = useState("");
  const [json, setJson] = useState(null);

  const handleJson = useCallback(() => {
    try {
      if (code) {
        const obj = JSON.parse(code);
        setJson(obj);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setJson(null);
      } else {
        throw error;
      }
    }
  }, [code]);

  useEffect(() => {
    handleJson();
  }, [code, handleJson]);

  return (
    <Grid h="100vh" templateColumns="repeat(2, 1fr)">
      <GridItem h="full">
        <CodeMirror
          height="100%"
          style={{ height: "100%" }}
          extensions={[cmJson()]}
          onChange={setCode}
        />
        {/* <Textarea
          h="full"
          resize="none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        /> */}
      </GridItem>
      <GridItem h="full">
        <Preview json={json} />
      </GridItem>
    </Grid>
  );
}
