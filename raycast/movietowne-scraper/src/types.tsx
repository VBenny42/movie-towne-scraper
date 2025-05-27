export type ShowTime = {
  date: Date;
  times: Date[];
};

export type Movie = {
  title: string;
  releaseDate: Date;
  nextShowing: Date | null; // Not present in JSON, calculated in Raycast
  link: string;
  runTime: string;
  showTimes: ShowTime[];
  genre: string[];
  synopsis: string;
};

export type CinemaLocation = { id: string; name: string };
export type ScraperConfig = {
  [key: string]: {
    path: string;
    args: string[];
  };
};

export const scraperPath = "/Users/vineshbenny/Projects/movie-towne-scraper/golang/movie-towne/";

export const genreColors = {
  Action: "#E63946", // Vibrant red
  Adventure: "#F9A826", // Golden amber
  Animated: "#00B4D8", // Bright cyan
  Children: "#96E072", // Light green
  Comedy: "#FFD166", // Sunny yellow
  Drama: "#6A4C93", // Deep purple
  Family: "#8AC926", // Grass green
  "Fantasy/Adventure": "#7209B7", // Magical purple
  Fantasy: "#7209B7", // Magical purple
  Horror: "#480CA8", // Dark violet
  "Horror/Thriller": "#3A0CA3", // Deep indigo purple
  "Thriller/Horror": "#590925", // Dark burgundy
  "Drama/Thriller": "#4B3A26", // Dark amber/brown
  Music: "#FB5607", // Bright orange
  "Musical/Performing Arts": "#FF85EA", // Pink
  Romance: "#FF5D8F", // Rose pink
  "Sci-Fi": "#3A86FF", // Electric blue
  Thriller: "#073B4C", // Dark teal
  "Action/Thriller": "#073B4C", // Dark teal
  "Drama/Suspense": "#8C1D40", // Deep crimson
  Biography: "#2A9D8F", // Teal green
  Suspense: "#540B0E", // Deep burgundy red
  Crime: "#540B0E", // Deep burgundy red
  "Children/Action": "#FF6B35", // Bright orange-red
};
