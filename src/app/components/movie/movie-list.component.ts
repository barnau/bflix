import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Video } from '../../models/movie';
import { EMovieGenres } from '../../models/EMovieGenres.enum';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Video[];
  unfilteredMovies: Video[];
  genre: string;


  constructor(private router: Router, private route: ActivatedRoute) { }



  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.unfilteredMovies = this.route.snapshot.data['movies'];
    this.movies = this.unfilteredMovies;

    this.route.params.subscribe(params => {
      let genre = params['genre'];

      if(genre) {
        if(genre == 'all') {
          this.movies = this.unfilteredMovies;
        } else {
          this.movies = this.unfilteredMovies
            .filter((movie: Video) => { return EMovieGenres[movie.genre.toLocaleLowerCase()] === EMovieGenres[genre]});
        }
      }
    })
  }







}
