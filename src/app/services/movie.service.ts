import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonValues } from '../common/commonValues';
import { AuthService } from './auth.service';
import { Movie } from '../models/movie';

const URL: string = CommonValues.devApi + '/movie/'

@Injectable({
  providedIn: 'root'
}) 
export class MovieService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getMovies() {
    let httpOptions = this.auth.getHttpOptions();
    return this.http.get(URL, httpOptions);
  }

  postMovie(movie: Movie) {
    let httpOptions = this.auth.getHttpOptions();
    return this.http.post(URL, movie, httpOptions);
  }

  putMovie(movie: Movie) {
    let httpOptions = this.auth.getHttpOptions();
    return this.http.put(URL + movie._id , movie, httpOptions);
  }

}
