import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-thumbnail',
  templateUrl: './movie-thumbnail.component.html',
  styleUrls: ['./movie-thumbnail.component.css']
})
export class MovieThumbnailComponent implements OnInit {

 @Input() movie: Movie

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  play() {
    this.movieService.getMovieStream(this.movie._id).subscribe( (movie) => {
      debugger;
    }, (err) => {
      debugger;
    })
  }

}
