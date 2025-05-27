package main

import (
	"fmt"
	"net/http"
	"path/filepath"
	"testing"
	"time"

	"github.com/gocolly/colly"
)

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
		t.Error("expected run time to be "+expected+" , got:", m.RunTime)
	}
}
