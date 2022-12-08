import {
  ActionIcon,
  Space,
  TextInput,
  useMantineTheme,
  Button,
  Grid,
  Container,
  Center,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconSearch } from "@tabler/icons";
import axios from "axios";
import React, { useState } from "react";
import ResultsContainer from "./ResultsContainer";

const SearchPage = () => {
  const theme = useMantineTheme();
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const APIKEY: string = "WnTEYVz8yJSXIH1ZF4mLgRF33Ey4oC1g";
  const searchAPI = async () => {
    if (!(searchInput.length > 0)) {
      return;
    }
    try {
      const resp = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: { api_key: APIKEY, q: searchInput },
      });
      setResults(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchRandom = async () => {
    try {
      const resp = await axios.get("https://api.giphy.com/v1/gifs/trending", {
        params: { api_key: APIKEY },
      });
      setResults(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <>
      <Container>
        <Grid align="center">
          <Grid.Col xs={8}>
            <TextInput
              icon={<IconSearch size={18} stroke={1.5} />}
              radius="xl"
              size="md"
              onChange={(e) => handleChange(e)}
              rightSection={
                <ActionIcon
                  size={32}
                  radius="xl"
                  color={theme.primaryColor}
                  variant="filled"
                  onClick={() => searchAPI()}
                >
                  {theme.dir === "ltr" ? (
                    <IconArrowRight size={18} stroke={1.5} />
                  ) : (
                    <IconArrowLeft size={18} stroke={1.5} />
                  )}
                </ActionIcon>
              }
              placeholder="Search gifs!"
              rightSectionWidth={42}
            />
          </Grid.Col>
          <Grid.Col xs={4}>
            <Center>
              <Button onClick={() => searchRandom()}>Give me trends!</Button>
            </Center>
          </Grid.Col>
        </Grid>
      </Container>
      <Space h="md" />
      {results.length > 0 && <ResultsContainer results={results} />}
    </>
  );
};

export default SearchPage;
