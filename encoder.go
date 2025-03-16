package main

import (
	"encoding/json"
	"fmt"
	"os"
)

func writeToJSON(movies []Movie, filename string) error {
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()

	jsonData, err := json.MarshalIndent(movies, "", "  ")
	if err != nil {
		return fmt.Errorf("marshalling: %w", err)
	}

	_, err = file.Write(jsonData)
	if err != nil {
		return fmt.Errorf("writing: %w", err)
	}

	return nil
}

func readFromJSON(filename string) ([]Movie, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, fmt.Errorf("opening: %w", err)
	}
	defer file.Close()

	var movies []Movie
	err = json.NewDecoder(file).Decode(&movies)
	if err != nil {
		return nil, fmt.Errorf("decoding: %w", err)
	}

	return movies, nil
}
