import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieResolverService implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.movieService.getMovies().map(movies => movies);
  }

  constructor(private movieService: MovieService) { }
}
