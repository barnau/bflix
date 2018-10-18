import { Resolve } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieResolverService implements Resolve<any> {
  resolve(): Observable<any> {
    return this.movieService.getMovies().map(movies => { 
      return movies });
  }

  constructor(private movieService: MovieService) { }
}
