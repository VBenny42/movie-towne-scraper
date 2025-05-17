export type ShowTime = {
  date: Date;
  times: Date[];
};

export type Movie = {
  title: string;
  releaseDate: Date;
  nextShowing: Date | null;
  link: string;
  genre: string[];
  showTimes: ShowTime[];
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
