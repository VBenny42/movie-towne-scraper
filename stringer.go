package main

import (
	"fmt"
	"strings"
)

func (m Movie) String() string {
	return fmt.Sprintf(
		"%s (%s) - [%s]: times: %s",
		m.Title,
		m.ReleaseDate.Format(releaseFormat),
		m.Link,
		m.ShowTimes,
	)
}

func (st ShowTime) String() string {
	var builder strings.Builder

	builder.WriteString(fmt.Sprintf("%s\n", st.Date.Format(airDateFormat)))
	for _, t := range st.Times {
		builder.WriteString(fmt.Sprintf("\t%s\n", t.Format(showTimeFormat)))
	}

	return builder.String()
}
