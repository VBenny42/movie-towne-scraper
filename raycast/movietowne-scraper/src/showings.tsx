import { useEffect, useState } from "react";
import fs from "fs";
import { ActionPanel, Action, List, Toast, showToast, Color, Icon, Detail } from "@raycast/api";
import { useExec } from "@raycast/utils";
import { scraperPath, Movie } from "./types";

const genreColors = {
  Action: "#E63946", // Vibrant red
  Adventure: "#F9A826", // Golden amber
  Animated: "#00B4D8", // Bright cyan
  Children: "#96E072", // Light green
  Comedy: "#FFD166", // Sunny yellow
  Drama: "#6A4C93", // Deep purple
  Family: "#8AC926", // Grass green
  "Fantasy/Adventure": "#7209B7", // Magical purple
  Horror: "#480CA8", // Dark violet
  Music: "#FB5607", // Bright orange
  "Musical/Performing Arts": "#FF85EA", // Pink
  Romance: "#FF5D8F", // Rose pink
  "Sci-Fi": "#3A86FF", // Electric blue
  Thriller: "#073B4C", // Dark teal
};

export default function Command() {
  const { isLoading } = useExec(scraperPath + "movie-towne-scraper", ["--print=false"]);

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (!isLoading) {
      parseMovies();
    }
  }, [isLoading]);

  const parseMovies = async () => {
    const toast = await showToast({ style: Toast.Style.Animated, title: "Parsing Movies..." });

    try {
      const rawData = fs.readFileSync(scraperPath + "movies.json", "utf-8");
      const jsonData = JSON.parse(rawData);

      if (!jsonData || !Array.isArray(jsonData)) {
        throw new Error("Invalid JSON data");
      }

      const parsedMovies = jsonData.map((movie: any) => {
        const showTimes = movie.showTimes.map((showTime: any) => ({
          date: new Date(showTime.date),
          times: showTime.times.map((time: string) => new Date(time)),
        }));

        for (const genre of movie.genre) {
          if (!genreColors[genre as keyof typeof genreColors]) {
            throw new Error(`Unknown genre: ${genre}, please update the genreColors mapping.`);
          }
        }

        return {
          title: movie.title,
          releaseDate: new Date(movie.releaseDate),
          genre: movie.genre,
          link: movie.link,
          synopsis: movie.synopsis,
          showTimes,
        };
      });
      toast.style = Toast.Style.Success;
      toast.title = "Movies Parsed Successfully";

      setMovies(parsedMovies);
    } catch (error: any) {
      toast.style = Toast.Style.Failure;
      toast.title = "Error Parsing Movies";
      toast.message = error.message;
    }
  };

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search Movies...">
      {movies.map((movie) => (
        <List.Item
          key={movie.link}
          title={movie.title}
          subtitle={movie.showTimes[0].times[0].toLocaleTimeString([], {
            weekday: "short",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
          accessories={movie.genre
            .map(
              (genre): List.Item.Accessory => ({
                icon: Icon.Tag,
                tooltip: genre,
              }),
            )
            // .slice(0, 3)
            .concat([{ date: movie.releaseDate }])}
          actions={
            <ActionPanel>
              <Action.Push
                title="Show Times"
                icon={Icon.Calendar}
                target={
                  <Detail
                    markdown={`
${movie.synopsis}

## Show Times

| Date | Showtimes |
|------|-----------|
${movie.showTimes
  .map(
    (showTime) =>
      `| ${showTime.date.toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
      })} | ${showTime.times
        .map((time) =>
          time.toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        )
        .join(", ")} |`,
  )
  .join("\n")}`}
                    navigationTitle={movie.title}
                    metadata={
                      <Detail.Metadata>
                        <Detail.Metadata.TagList title="Genres">
                          {movie.genre.map((genre) => (
                            <Detail.Metadata.TagList.Item
                              key={genre}
                              text={genre}
                              color={genreColors[genre as keyof typeof genreColors] || Color.Red}
                            />
                          ))}
                        </Detail.Metadata.TagList>
                        <Detail.Metadata.Label
                          title="Release Date"
                          text={movie.releaseDate.toLocaleDateString([], {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        />
                      </Detail.Metadata>
                    }
                    actions={
                      <ActionPanel>
                        <Action.OpenInBrowser url={movie.link} title="Open Movie Page" />
                      </ActionPanel>
                    }
                  />
                }
              />
              <Action.OpenInBrowser url={movie.link} title="Open Movie Page" />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
