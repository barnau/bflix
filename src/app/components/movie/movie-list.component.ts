import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Movie } from '../../models/movie';
import { EMovieGenres } from '../../models/EMovieGenres.enum';
import { MovieService } from '../../services/movie.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: any;
  

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private moiveService: MovieService) { }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.movies = this.route.snapshot.data['movies'];
    debugger;
  }

}
