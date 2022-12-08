import { Grid, Container } from "@mantine/core";
import { GifCard } from "./GifCard";

export default function SavedPage() {
  let storage = localStorage.getItem("gifs");
  let savedGifs = {};
  if (storage) {
    savedGifs = JSON.parse(storage);
  }
  return (
    <Container my="md">
      <Grid>
        {Object.keys(savedGifs).length > 0 &&
          Object.keys(savedGifs).map((key) => (
            <Grid.Col lg={6} key={key}>
              <GifCard id={key} title={""} url={savedGifs[key as keyof {}]} />
            </Grid.Col>
          ))}
      </Grid>
    </Container>
  );
}
