import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-display-autocomplete-movie',
  templateUrl: './display-autocomplete.component.html',
  styleUrls: ['./display-autocomplete.component.css']
})
export class DisplayAutocompleteMoviesComponent implements OnInit {

  searchControl = new FormControl();
  @Input()
  movies: any[];
  @Output()
  Id = new EventEmitter()

  filteredOptions: Observable<any[]>;

  ngOnInit() {
    console.log(this.movies);

    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(title => title ? this._filter(title) : this.movies.slice())
      );
  }

  displayFn(video?: any): string | undefined {
    return video ? video.title : undefined;
  }

  private _filter(title: string): any[] {
    const filterValue = title.toLowerCase();

    return this.movies.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {
    debugger;
    if(this.searchControl.value._id) {
      this.Id.emit(this.searchControl.value._id)
    } else {
      this.Id.emit('all');
    }
  }

}
