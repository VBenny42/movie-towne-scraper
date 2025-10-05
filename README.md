# MovieTowne Showings Raycast Extension

Actual scraper written in `golang`, couple things needed to configure:
1. `go mod download` in the `golang/movie-towne/` directory to download dependencies
2. `go build` in the `golang/movie-towne/` directory to build the binary
3. Also need to set path for json file in `golang/movie-towne/main.go` file.
4. In raycast folder, need to set paths similarly. I'll probably have a `.env` file in the future to make this easier.
5. In raycast folder, run `npm install` to install dependencies.
6. Run `npx ray build` to build the extension.
7. In Raycast itself, need to add the extension as a local extension.
    - Gotta point raycast to the raycast folder, not the golang folder.
