import { VideoBase } from "./videoBase";

export class Movie implements VideoBase {
  _id?: string;
  title: string;
  synopsis: string;
  director: string;
  posterLocation;
  location: string;
  genre: string;
}


