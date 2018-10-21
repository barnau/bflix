import { Resolve } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieResolverService implements Resolve<any> {
  resolve(): Observable<any> {
    return this.movieService.getMovies().map(movies => {
      debugger;
      return movies });
  }

  constructor(private movieService: MovieService) { }
}
