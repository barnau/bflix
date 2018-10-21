import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-player',
  templateUrl: './movie-player.component.html',
  styleUrls: ['./movie-player.component.css']
})
export class MoviePlayerComponent implements OnInit {
  movieId: string;
  movieLocation: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.movieLocation = this.route.snapshot.paramMap.get('loc');
    //this.movieLocation = 'http://static.videogular.com/assets/videos/videogular.mp4';
    // this.movieService.getMovieStream(this.movieId).subscribe((data) => {
    //   console.log(data);
    //   this.source = 'http://static.videogular.com/assets/videos/videogular.mp4'
    // })
  }

}
