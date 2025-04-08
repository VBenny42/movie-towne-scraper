package main

import (
	"flag"
	"fmt"
	"os"
	"time"
)

const (
	sando = "https://www.movietowne.com/cinemas/nowshowing/san-fernando/"
	pos   = "https://www.movietowne.com/cinemas/nowshowing/port-of-spain/"
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

	err = writeToJSON(movies, "movies.json")
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

		data, err := os.Stat("movies.json")
		if err != nil {
			if os.IsNotExist(err) {
				fmt.Println("File does not exist, forcing scrape")
				err := scrapeAndSave(url)
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

		if data.ModTime().Day() != time.Now().Day() {
			fmt.Println("Updating movies.json")
			err := scrapeAndSave(url)
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
