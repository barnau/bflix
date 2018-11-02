import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
import { EMovieGenres } from '../../models/EMovieGenres.enum';
import 'rxjs/add/operator/map';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[];
  unfilteredMovies: Movie[];
  genre: string;
  searchId: string;
  movieIdSubscription: Subscription;


  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private navService: NavBarService) { 
      this.movieIdSubscription = this.navService.getId().subscribe(idResult => {
        
        this.findById(idResult.id);
      })
    }



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
        if(genre !== 'all') {
          this.movies = this.unfilteredMovies
            .filter((movie: Movie) => { return EMovieGenres[movie.genre.toLocaleLowerCase()] === EMovieGenres[genre]});
        }
      }
      
      this.navService.sendVideoArray(this.movies);
    })

  }

  findById(id) {
    
    if(id === 'all') {
      this.movies = this.unfilteredMovies;
    } else {
      let movie = this.unfilteredMovies.find(movie => movie._id === id);
      this.movies = [];
      this.movies.push(movie);
    }
  }







}
