import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-thumbnail',
  templateUrl: './movie-thumbnail.component.html',
  styleUrls: ['./movie-thumbnail.component.css']
})
export class MovieThumbnailComponent implements OnInit {

 @Input() movie: Movie

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit() {
  }

  play() {
    this.router.navigate(['/player', this.movie._id])
    // this.movieService.getMovieStream(this.movie._id).subscribe( (movie) => {
    //   this.router.navigate([''])
    //   debugger;
    // }, (err) => {
    //   debugger;
    // })
  }

}
