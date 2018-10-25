import { Component, OnInit, Input } from '@angular/core';
import { TvShow, Season } from 'src/app/models/tv';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tv-thumbnail',
  templateUrl: './tv-thumbnail.component.html',
  styleUrls: ['./tv-thumbnail.component.css']
})
export class TvThumbnailComponent implements OnInit {

  @Input()
  show: TvShow;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sendSeasonsToDetails(seasons: Season[]) {
    console.log(seasons);
    var seasonsString = JSON.stringify(seasons);
    this.router.navigate(['/tvdetails', seasonsString])
  }

}
