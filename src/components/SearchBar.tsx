import {
  ActionIcon,
  Container,
  Grid,
  Space,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconSearch } from "@tabler/icons";
import axios from "axios";
import React, { useState } from "react";
import { BadgeCard } from "./BadgeCard";

const SearchBar = () => {
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
      console.log(resp.data);
      setResults(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const sliceLastFive = (url: string) => {
    return url.slice(0, -5);
  };

  return (
    <>
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
        placeholder="Search questions"
        rightSectionWidth={42}
      />
      <Space h="md" />
      <Container>
        <Grid>
          {results.length > 0 &&
            results.map((result: any) => (
              <Grid.Col xs={3} key={result.id}>
                <BadgeCard
                  title={result.title}
                  image={sliceLastFive(result.images.original.webp)}
                />
              </Grid.Col>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default SearchBar;
