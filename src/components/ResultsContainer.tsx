import { Container, Grid } from "@mantine/core";
import React from "react";
import { BadgeCard } from "./BadgeCard";

const ResultsContainer = ({ results }: any) => {
  const sliceLastFive = (url: string) => {
    return url.slice(0, -5);
  };

  return (
    <Container>
      <Grid>
        {results.map((result: any) => (
          <Grid.Col xs={3} key={result.id}>
            <BadgeCard
              title={result.title}
              image={sliceLastFive(result.images.original.webp)}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default ResultsContainer;
