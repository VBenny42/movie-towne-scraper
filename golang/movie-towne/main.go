package main

import (
	"cmp"
	"flag"
	"log/slog"
	"os"
	"slices"
	"time"
)

const (
	sando = "https://www.movietowne.com/cinemas/nowshowing/san-fernando/"
	pos   = "https://www.movietowne.com/cinemas/nowshowing/port-of-spain/"
)

func getJsonLocation(url string) string {
	switch url {
	case sando:
		return "/Users/vineshbenny/Projects/movie-towne-scraper/golang/movie-towne/movies-san-fernando.json"
	case pos:
		return "/Users/vineshbenny/Projects/movie-towne-scraper/golang/movie-towne/movies-port-of-spain.json"
	default:
		return "/Users/vineshbenny/Projects/movie-towne-scraper/golang/movie-towne/movies-san-fernando.json"
	}
}

func scrapeAndSave(url string) error {
	movies, err := scrapeMovies(url)
	if err != nil {
		return err
	}

	for i := range movies {
		err := movies[i].scrapeMovieTimes()
		if err != nil {
			return err
		}
	}

	slices.SortFunc(movies, func(a, b Movie) int {
		return cmp.Compare(
			a.ShowTimes[0].Times[0].Unix(),
			b.ShowTimes[0].Times[0].Unix(),
		)
	})

	err = writeToJSON(movies, getJsonLocation(url))
	if err != nil {
		return err
	}

	return nil
}

// flag to force the scraper to run
// otherwise, check modified time of movies.json
// only scrape if it's another day

func main() {
	var (
		force       = flag.Bool("force", false, "force the scraper to run")
		shouldPrint = flag.Bool("print", true, "print the movies to stdout")
		posFlag     = flag.Bool("pos", false, "scrape the POS site")
		verbose     = flag.Bool("verbose", true, "enable verbose logging")
	)
	flag.Parse()

	url := sando
	if *posFlag {
		url = pos
	}
	jsonLocation := getJsonLocation(url)

	if *verbose {
		slog.SetLogLoggerLevel(slog.LevelInfo)
	} else {
		slog.SetLogLoggerLevel(slog.LevelWarn)
	}

	if *force {
		slog.Info("Forcing scrape")
		err := scrapeAndSave(url)
		if err != nil {
			slog.Error(err.Error())
		}
	} else {
		slog.Info("Checking modified time")

		data, err := os.Stat(jsonLocation)
		if err != nil {
			if os.IsNotExist(err) {
				slog.Warn("File does not exist, forcing scrape")
				err := scrapeAndSave(url)
				if err != nil {
					slog.Error(err.Error())
					return
				}
				data, _ = os.Stat(jsonLocation)
			} else {
				slog.Error(err.Error())
				return
			}
		}

		if data.ModTime().Day() != time.Now().Day() {
			slog.Info("Updating " + jsonLocation)
			err := scrapeAndSave(url)
			if err != nil {
				slog.Error(err.Error())
			}
		}
	}

	if *shouldPrint {
		movies, err := readFromJSON(jsonLocation)
		if err != nil {
			slog.Error(err.Error())
			return
		}

		for _, m := range movies {
			slog.Info(m.String())
		}
	}
}
