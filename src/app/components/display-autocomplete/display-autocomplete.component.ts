import {Component, OnInit, Input, EventEmitter, Output, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { VideoBase } from 'src/app/models/videoBase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-autocomplete-movie',
  templateUrl: './display-autocomplete.component.html',
  styleUrls: ['./display-autocomplete.component.css']
})
export class DisplayAutocompleteMoviesComponent implements OnInit {

  searchControl = new FormControl();
  movies: VideoBase[];
  // @Output()
  // Id = new EventEmitter();
  id: string;
  videoArraySubscription: Subscription;

  filteredOptions: Observable<any[]>;

  constructor(
    private navService: NavBarService,
    private router: Router) {

    //receive video array from tv or movie list component
    this.navService.getVideoArray().subscribe(movies => {
      this.movies = movies.videoBaseArray;
      this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(title => title ? this._filter(title) : this.movies.slice())
      );
    })

    // listen for router event and clear search form value
    router.events.subscribe((event) => {
      this.searchControl.setValue(undefined);
    })


  }

  ngOnInit() {
    console.log(this.movies);
    
  }

  


  displayFn(video?: any): string | undefined {
    return video ? video.title : undefined;
  }

  private _filter(title: string): any[] {
    const filterValue = title.toLowerCase();

    return this.movies.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {
    
    if(this.searchControl.value._id) {
      this.navService.sendId(this.searchControl.value._id)
    } else {
      this.navService.sendId('all');
    }
  }

}
