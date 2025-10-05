package main

import (
	"fmt"
	"strings"
	"time"

	"github.com/gocolly/colly"
)

const (
	currentYear = 2025

	releaseFormat  = "02/01/2006"
	airDateFormat  = "Mon, 2 Jan"
	showTimeFormat = "3:04 pm"
)

type (
	ShowTime struct {
		Date  time.Time   `json:"date"`
		Times []time.Time `json:"times"`
	}

	Movie struct {
		Title       string     `json:"title"`
		ReleaseDate time.Time  `json:"releaseDate"`
		Link        string     `json:"link"`
		RunTime     string     `json:"runTime"`
		ShowTimes   []ShowTime `json:"showTimes"`
		Genre       []string   `json:"genre"`
		Synopsis    string     `json:"synopsis"`
		ThumbNail   string     `json:"thumbnail"`
	}
)

func scrapeMovies(site string) (movies []Movie, err error) {
	c := colly.NewCollector()

	c.OnHTML("div.thumbnail", func(e *colly.HTMLElement) {
		var m Movie

		// Should just have two elements
		e.ForEach("span.movie_thumbnail_caption", func(i int, el *colly.HTMLElement) {
			switch i {
			case 0:
				m.Title = el.Text
			case 1:
				m.ReleaseDate, err = time.ParseInLocation(
					releaseFormat,
					strings.Fields(el.Text)[2],
					time.Local,
				)
				if err != nil {
					return
				}
			default:
				err = fmt.Errorf("unexpected element: %s", el.Text)
				return
			}
		})

		m.ThumbNail = e.ChildAttr("img", "src")
		m.Link = e.ChildAttr("a", "href")

		movies = append(movies, m)
	})

	c.Visit(site)

	return
}

func (m *Movie) scrapeMovieTimes(c *colly.Collector) (err error) {
	c.OnHTML("div.selected_movie_synopsis", func(e *colly.HTMLElement) {
		e.ForEach("p", func(i int, el *colly.HTMLElement) {
			if i == 0 {
				return
			}

			m.Synopsis = strings.TrimSpace(el.Text)
		})
	})

	c.OnHTML("p.selected_movie_run_time", func(e *colly.HTMLElement) {
		e.ForEach("span", func(i int, el *colly.HTMLElement) {
			if i != 1 {
				return
			}

			m.RunTime = strings.TrimSpace(el.Text)
		})
	})

	c.OnHTML("p.selected_movie_categories", func(e *colly.HTMLElement) {
		e.ForEach("span", func(i int, el *colly.HTMLElement) {
			switch i {
			case 0:
				return
			case 1:
				m.Genre = strings.Split(strings.TrimSpace(el.Text), ", ")
			default:
				err = fmt.Errorf("unexpected element: %s", el.Text)
				return
			}
		})
	})

	// Need to read date from the time_date div, then get the times from the
	// time slot divs in time sheet
	c.OnHTML("div.content_right_wrapper div.time_block", func(e *colly.HTMLElement) {
		var (
			st ShowTime
			t  time.Time
		)

		date := e.ChildText("div.time_date")
		t, err = time.Parse(airDateFormat, date)
		if err != nil {
			err = fmt.Errorf("%s: %w", m.Link, err)
			return
		}

		st.Date = time.Date(
			currentYear,
			t.Month(),
			t.Day(),
			0, 0, 0, 0,
			time.Local,
		)

		e.ForEach("div.time_slot", func(_ int, el *colly.HTMLElement) {
			// ignore if element has time_spacer class
			if el.DOM.HasClass("time_spacer") {
				return
			}

			t, err = time.Parse(showTimeFormat, el.Text)
			if err != nil {
				err = fmt.Errorf("%s: %w", m.Link, err)
				return
			}
			st.Times = append(
				st.Times,
				time.Date(
					st.Date.Year(),
					st.Date.Month(),
					st.Date.Day(),
					t.Hour(), t.Minute(), 0, 0,
					time.Local,
				),
			)
		})

		m.ShowTimes = append(m.ShowTimes, st)
	})

	err = c.Visit(m.Link)
	if err != nil {
		err = fmt.Errorf("%s: %w", m.Link, err)
		return
	}

	return
}
