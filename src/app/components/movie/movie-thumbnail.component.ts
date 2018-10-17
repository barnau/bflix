import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-thumbnail',
  templateUrl: './movie-thumbnail.component.html',
  styleUrls: ['./movie-thumbnail.component.css']
})
export class MovieThumbnailComponent implements OnInit {

 @Input() movie: Movie

  constructor() { }

  ngOnInit() {
  }

}
