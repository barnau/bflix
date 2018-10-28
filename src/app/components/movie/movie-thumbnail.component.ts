import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-thumbnail',
  templateUrl: './movie-thumbnail.component.html',
  styleUrls: ['./movie-thumbnail.component.css']
})
export class MovieThumbnailComponent implements OnInit {

 @Input() movie: Video

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit() {
  }

  play() {
    this.router.navigate(['/player', this.movie.location])
    // this.movieService.getMovieStream(this.movie._id).subscribe( (movie) => {
    //   this.router.navigate([''])
    //   
    // }, (err) => {
    //   
    // })
  }

}
