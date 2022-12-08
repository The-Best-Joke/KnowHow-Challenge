import { IconHeart } from "@tabler/icons";
import {
  Card,
  Image,
  Text,
  Group,
  ActionIcon,
  createStyles,
} from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  saved: {
    color: theme.colors.red[6],
    fill: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface CardProps {
  id: string;
  url: string;
  title: string;
}

let storage = localStorage.getItem("gifs");
let savedGifs = {};

if (storage) {
  savedGifs = JSON.parse(storage);
}

export function GifCard({ url, title, id }: CardProps) {
  const { classes } = useStyles();
  const [saved, setSaved] = useState(id in savedGifs);
  const handleChange = (isSaved: boolean) => {
    if (isSaved) {
      storage = localStorage.getItem("gifs");
      if (storage) {
        savedGifs = JSON.parse(storage);
        savedGifs = { ...savedGifs, [id]: undefined };
        localStorage.setItem("gifs", JSON.stringify(savedGifs));
        setSaved(false);
      }
    } else {
      storage = localStorage.getItem("gifs");
      if (storage) {
        savedGifs = JSON.parse(storage);
        savedGifs = { ...savedGifs, [id]: url };
      } else {
        savedGifs = { [id]: url };
      }
      localStorage.setItem("gifs", JSON.stringify(savedGifs));
      setSaved(true);
    }
  };

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={url} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {title}
          </Text>
        </Group>
      </Card.Section>

      <Group mt="xs" position={"center"}>
        <ActionIcon
          variant="default"
          radius="md"
          size={36}
          onClick={() => handleChange(saved)}
        >
          {saved ? (
            <IconHeart size={18} className={classes.saved} stroke={1.5} />
          ) : (
            <IconHeart size={18} className={classes.like} stroke={1.5} />
          )}
        </ActionIcon>
      </Group>
    </Card>
  );
}
