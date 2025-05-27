import { useEffect, useState } from "react";
import fs from "fs";
import { ActionPanel, Action, List, Toast, showToast, Color, Icon, Detail } from "@raycast/api";
import { useExec } from "@raycast/utils";
import { scraperPath, Movie, ShowTime, CinemaLocation, ScraperConfig, genreColors } from "./types";

function CinemaDropdown(props: { cinemas: CinemaLocation[]; onCinemaChange: (newValue: string) => void }) {
  const { cinemas, onCinemaChange } = props;
  return (
    <List.Dropdown
      tooltip="Select Cinema"
      storeValue={true}
      onChange={(newValue) => {
        onCinemaChange(newValue);
      }}
    >
      {cinemas.map((cinema) => (
        <List.Dropdown.Item key={cinema.id} title={cinema.name} value={cinema.id} />
      ))}
    </List.Dropdown>
  );
}

function movieToListItem(movie: Movie) {
  return (
    <List.Item
      key={movie.link}
      title={movie.title}
      subtitle={(() => {
        const nextShowTime = movie.nextShowing;

        if (!nextShowTime) {
          return "No upcoming showtimes for today";
        }

        return nextShowTime.toLocaleString([], {
          weekday: "short",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      })()}
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
                    <Detail.Metadata.Label title="Runtime" text={movie.runTime || "Unknown"} />
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
  );
}

export default function Command() {
  const cinemas: CinemaLocation[] = [
    { id: "1", name: "San Fernando" },
    { id: "2", name: "Port of Spain" },
  ];

  const [cinema, setCinema] = useState<CinemaLocation>(cinemas[0]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [toast, setToast] = useState<Toast | null>(null);
  const currentDate = new Date();

  const scraperConfig: ScraperConfig = {
    "1": {
      // San Fernando
      path: scraperPath + "movie-towne-scraper",
      args: ["--pos=false", "--print=false", "--verbose=false"],
    },
    "2": {
      // Port of Spain
      path: scraperPath + "movie-towne-scraper",
      args: ["--pos=true", "--print=false", "--verbose=false"],
    },
  };
  const { isLoading } = useExec(scraperConfig[cinema.id].path, scraperConfig[cinema.id].args);

  const onCinemaChange = (newValue: string) => {
    const selectedCinema = cinemas.find((cinema) => cinema.id === newValue);
    if (selectedCinema) {
      setCinema(selectedCinema);
    }
  };

  async function initializeToast(title: string) {
    const newToast = await showToast({
      style: Toast.Style.Animated,
      title: title,
    });
    setToast(newToast);
  }

  useEffect(() => {
    if (isLoading) {
      initializeToast("Loading Movies...");
    } else {
      if (toast) {
        toast.title = "Parsing Movies...";
      } else {
        initializeToast("Parsing Movies...");
      }
      parseMovies(cinema);
    }
  }, [isLoading, cinema]);

  const parseMovies = async (cinema: CinemaLocation) => {
    try {
      const location = cinema.name.toLowerCase().replace(/\s+/g, "-");
      const rawData = fs.readFileSync(scraperPath + "movies-" + location + ".json", "utf-8");
      const jsonData = JSON.parse(rawData);

      if (!jsonData || !Array.isArray(jsonData)) {
        throw new Error("Invalid JSON data");
      }

      const parsedMovies = jsonData.map((movie: Movie): Movie => {
        const showTimes = movie.showTimes.map((showTime: ShowTime) => ({
          date: new Date(showTime.date),
          times: showTime.times.map((time) => new Date(time)),
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
          runTime: movie.runTime,
          nextShowing:
            showTimes
              .slice(0, 1)
              .flatMap((showTime) => showTime.times)
              .find((time) => time > currentDate) || null,
          link: movie.link,
          synopsis: movie.synopsis,
          showTimes,
        };
      });

      if (parsedMovies.length === 0) {
        throw new Error("No movies found");
      }

      // DONE: Want to display the movies in order of showtime
      // In order of showtime meaning, it should be sorted by which showtime is closest to the current time
      // I also want to display all the showtimes in the detail view

      parsedMovies.sort((a, b) => {
        const aNextShowTime = a.nextShowing;
        const bNextShowTime = b.nextShowing;

        // Keeo original order if both are null
        if (!aNextShowTime && !bNextShowTime) {
          return 0;
        }

        // If only a null, push to the end
        if (!aNextShowTime) {
          return 1;
        }

        // If only b null, push to the end
        if (!bNextShowTime) {
          return -1;
        }

        return aNextShowTime.getTime() - bNextShowTime.getTime();
      });

      if (toast) {
        toast.style = Toast.Style.Success;
        toast.title = "Movies Parsed Successfully";
      }

      setMovies(parsedMovies);
    } catch (error) {
      if (toast) {
        toast.style = Toast.Style.Failure;
        toast.title = "Error Parsing Movies";
        toast.message = error instanceof Error ? error.message : "Unknown error occurred";
      }
    }
  };

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search Movies..."
      searchBarAccessory={<CinemaDropdown cinemas={cinemas} onCinemaChange={onCinemaChange} />}
    >
      {movies.map((movie) => movieToListItem(movie))}
    </List>
  );
}
