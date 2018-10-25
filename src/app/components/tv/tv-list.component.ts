import { Component, OnInit } from '@angular/core';
import { TvShow } from 'src/app/models/tv';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.css']
})
export class TvListComponent implements OnInit {

  tvshows: TvShow[];

  constructor() { 
    this.tvshows = [
      {
        seasons: [
          {
            seasonNumber: "Season One",
            episodes: [
              {
                location: "tbd",
                name: "Episode One"
              },
              {
                location: "tbd",
                name: "Episode Two"
              },
              {
                location: "tbd",
                name: "Episode Three"
              }
            ]
          }
        ],
        synopsis: "Some whore sleeps around or something",
        title: "The Affair",
        posterLocation: "https://image.ibb.co/fBdYiA/castlerock.jpg"
      },
      {
        seasons: [
          {
            seasonNumber: "Season One",
            episodes: [
              {
                location: "tbd",
                name: "Episode One"
              },
              {
                location: "tbd",
                name: "Episode Two"
              },
              {
                location: "tbd",
                name: "Episode Three"
              }
            ]
          }
        ],
        synopsis: "After watching the first season I'm not really sure. Maybe the devil. Alternate realities possibly? Still pretty cool. Confusing though.",
        title: "Castle Rock",
        posterLocation: "https://image.ibb.co/nF7Uqq/theaffair.jpg"
      }
    ];
 
  }

  ngOnInit() {
    }

}
