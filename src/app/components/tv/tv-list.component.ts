import { Component, OnInit } from '@angular/core';
import { TvShow } from 'src/app/models/tv';
import { ActivatedRoute } from '@angular/router';
import { EMovieGenres } from 'src/app/models/EMovieGenres.enum';
import { Subscription } from 'rxjs';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.css']
})
export class TvListComponent implements OnInit {
  
  tvshows: TvShow[];
  unfilteredTvshows: TvShow[];
  searchId: string;
  tvshowIdSubscription: Subscription;

  constructor(private route: ActivatedRoute, private navService: NavBarService) {
    this.tvshowIdSubscription = this.navService.getId().subscribe(idResult => {
      this.findById(idResult.id);
    })
  }



  ngOnInit() {
    this.unfilteredTvshows = this.route.snapshot.data['tvshows'];
    this.tvshows = this.unfilteredTvshows;

    this.route.params.subscribe(params => {
      let genre = params['genre'];

      if(genre) {
        if(genre == 'all') {
          this.tvshows = this.unfilteredTvshows;
        } else {
          this.tvshows = this.unfilteredTvshows
            .filter((movie: TvShow) => { return EMovieGenres[movie.genre.toLocaleLowerCase()] === EMovieGenres[genre]});
        }
      }

      this.navService.sendVideoArray(this.tvshows);
    })
  }

  findById(id) {
    if(id === 'all') {
      this.tvshows = this.unfilteredTvshows;
    } else {
      let tvshow = this.unfilteredTvshows.find(tvshow => tvshow._id === id);
      this.tvshows = [];
      this.tvshows.push(tvshow);
    }
  }

}

