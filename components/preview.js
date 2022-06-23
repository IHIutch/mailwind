import { Spinner } from "@chakra-ui/spinner";
import { Box, Center, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import axios from "redaxios";

export default function Preview({ json }) {
  const [isLoading, setIsLoading] = useState(false);
  const [html, setHtml] = useState(null);

  useEffect(() => {
    if (!json) return;

    const getHtml = async () => {
      setIsLoading(true);
      const { data } = await axios
        .post("/api/get-html", { json })
        .catch((err) => console.error(err));

      setIsLoading(false);
      setHtml(data);
    };
    getHtml();
  }, [json]);

  return isLoading ? (
    <Center boxSize="full">
      <Spinner />
    </Center>
  ) : (
    <Box>
      {html ? (
        <Box dangerouslySetInnerHTML={{ __html: html || "" }} />
      ) : (
        <Text>No data</Text>
      )}
    </Box>
  );
}
