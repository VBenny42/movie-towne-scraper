package main

import (
	"flag"
	"fmt"
	"os"
	"time"
)

func scrapeAndSave() error {
	movies, err := scrapeMovies()
	if err != nil {
		return err
	}

	for i := range movies {
		err := movies[i].scrapeMovieTimes()
		if err != nil {
			return err
		}
	}

	err = writeToJSON(movies, "movies.json")
	if err != nil {
		return err
	}

	return nil
}

// flag to force the scraper to run
// otherwise, check modified time of movies.json
// only scrape if it's older than 24 hours

func main() {
	var (
		force       = flag.Bool("force", false, "force the scraper to run")
		shouldPrint = flag.Bool("print", true, "print the movies to stdout")
	)
	flag.Parse()

	if *force {
		fmt.Println("Forcing scrape")
		err := scrapeAndSave()
		if err != nil {
			fmt.Println(err)
		}
	} else {
		fmt.Println("Checking modified time")

		data, err := os.Stat("movies.json")
		if err != nil {
			if os.IsNotExist(err) {
				fmt.Println("File does not exist, forcing scrape")
				err := scrapeAndSave()
				if err != nil {
					fmt.Println(err)
					return
				}
				data, _ = os.Stat("movies.json")
			} else {
				fmt.Println(err)
				return
			}
		}

		if data.ModTime().Add(24 * time.Hour).Before(time.Now()) {
			fmt.Println("Updating movies.json")
			err := scrapeAndSave()
			if err != nil {
				fmt.Println(err)
			}
		}
	}

	if *shouldPrint {
		movies, err := readFromJSON("movies.json")
		if err != nil {
			fmt.Println(err)
			return
		}

		for _, m := range movies {
			fmt.Println(m)
		}
	}
}
