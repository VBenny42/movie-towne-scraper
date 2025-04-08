package main

import (
	"cmp"
	"flag"
	"fmt"
	"os"
	"slices"
	"time"
)

const (
	sando = "https://www.movietowne.com/cinemas/nowshowing/san-fernando/"
	pos   = "https://www.movietowne.com/cinemas/nowshowing/port-of-spain/"

	jsonLocation = "/Users/vineshbenny/Projects/movie-towne-scraper/golang/movies.json"
)

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

	err = writeToJSON(movies, jsonLocation)
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
	)
	flag.Parse()

	url := sando
	if *posFlag {
		url = pos
	}

	if *force {
		fmt.Println("Forcing scrape")
		err := scrapeAndSave(url)
		if err != nil {
			fmt.Println(err)
		}
	} else {
		fmt.Println("Checking modified time")

		data, err := os.Stat(jsonLocation)
		if err != nil {
			if os.IsNotExist(err) {
				fmt.Println("File does not exist, forcing scrape")
				err := scrapeAndSave(url)
				if err != nil {
					fmt.Println(err)
					return
				}
				data, _ = os.Stat(jsonLocation)
			} else {
				fmt.Println(err)
				return
			}
		}

		if data.ModTime().Day() != time.Now().Day() {
			fmt.Println("Updating movies.json")
			err := scrapeAndSave(url)
			if err != nil {
				fmt.Println(err)
			}
		}
	}

	if *shouldPrint {
		movies, err := readFromJSON(jsonLocation)
		if err != nil {
			fmt.Println(err)
			return
		}

		for _, m := range movies {
			fmt.Println(m)
		}
	}
}
