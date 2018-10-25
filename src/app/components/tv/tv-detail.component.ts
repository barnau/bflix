import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Season } from 'src/app/models/tv';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.css']
})
export class TvDetailComponent implements OnInit {
  seasons: Season[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.seasons = params['seasons'];
    })
  }

}
