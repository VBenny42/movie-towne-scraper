package main

import (
	"fmt"
	"net/http"
	"path/filepath"
	"testing"
	"time"

	"github.com/gocolly/colly"
)

// Scraped movie should have the same data as this, except for link
const sinnersJSON = `{
    "title": "Sinners",
    "releaseDate": "2025-04-17T00:00:00-04:00",
    "link": "https://www.movietowne.com/cinemas/nowshowing/san-fernando/sinners",
    "runTime": "140 mins.",
    "showTimes": [
      {
        "date": "2025-05-27T00:00:00-04:00",
        "times": [
          "2025-05-27T14:00:00-04:00",
          "2025-05-27T21:30:00-04:00"
        ]
      },
      {
        "date": "2025-05-28T00:00:00-04:00",
        "times": [
          "2025-05-28T14:00:00-04:00",
          "2025-05-28T21:30:00-04:00"
        ]
      }
    ],
    "genre": [
      "Action",
      "Drama",
      "Horror",
      "Thriller"
    ],
    "synopsis": "Trying to leave their troubled lives behind, twin brothers return to their hometown to start again, only to discover that an even greater evil is waiting to welcome them back."
  }`

func TestMovieScrape(t *testing.T) {
	transport := &http.Transport{}
	transport.RegisterProtocol("file", http.NewFileTransport(http.Dir("/")))

	c := colly.NewCollector()
	c.WithTransport(transport)

	var m Movie

	dir, err := filepath.Abs("html")
	if err != nil {
		t.Fatalf("failed to get absolute path: %v", err)
	}

	m.Title = "Sinners"
	m.ReleaseDate = time.Date(2025, time.April, 17, 0, 0, 0, 0, time.Local)
	m.Link = "file://" + dir + "/Cinemas _ Now Showing _ MovieTowne.html"

	err = m.scrapeMovieTimes(c)
	if err != nil {
		t.Fatalf("scrape function failed: %v", err)
	}

	fmt.Printf("Movie: %s\n", m)

	expected := "140"
	if m.RunTime != expected {
		t.Errorf("expected run time %s, got %s", expected, m.RunTime)
	}
}
