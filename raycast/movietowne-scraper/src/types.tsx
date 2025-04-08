export type ShowTime = {
  date: Date;
  times: Date[];
};

export type Movie = {
  title: string;
  releaseDate: Date;
  link: string;
  genre: string[];
  showTimes: ShowTime[];
};

export const scraperPath = "/Users/vineshbenny/Projects/movie-towne-scraper/golang/";
