import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EMovieGenres } from 'src/app/models/EMovieGenres.enum';
import { Movie } from 'src/app/models/movie';
import { MatDialog } from '@angular/material';
import { UploadService } from 'src/app/services/upload.service';
import { imageUploadDialogComponent } from '../../shared/upload/dialog/dialog.component';
import { ImageService } from 'src/app/services/image.service';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  
  movieTitleFormGroup: FormGroup;
  extensionFormGroup: FormGroup;
  directorFormGroup: FormGroup;
  synopsisFormGroup: FormGroup;
  genreFormGroup: FormGroup;
  posterFormGroup: FormGroup;
  genres: string[] = []; 
  movie: Movie;
  posterLocation: any;
  editMode: boolean;
  editOrAdd: string = 'Add';
  movies: Movie[];
  selectedMovie: Movie;
  movieIdSubscription: Subscription;
  @ViewChild('imageInput') imageInput: ElementRef;
 
  
  constructor(
    private _formBuilder: FormBuilder, 
    public dialog: MatDialog, 
    public uploadService: UploadService, 
    private imgService: ImageService, 
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private navService: NavBarService,
    private toastr: ToastrService) { 

      this.movieIdSubscription = this.navService.getId().subscribe(id => {
        this.selectedMovie = this.movies.find(movie => movie._id === id.id);
        this.setMovieOnForm(this.selectedMovie);
      });

      this.selectedMovie = new Movie();
  }

  public setMovieOnForm(movie: Movie) {
    this.movieTitleFormGroup.get('movieTitleFormControl').setValue(movie.title);
    this.directorFormGroup.get('directorCtrl').setValue(movie.director);
    this.synopsisFormGroup.get('synopsisCtrl').setValue(movie.synopsis);
    this.genreFormGroup.get('genreCtrl').setValue(movie.genre);
    this.posterFormGroup.get('posterCtrl').setValue(movie.posterLocation);
    let locArr = movie.location.toLowerCase().split('.');
    let ext = locArr[locArr.length - 1];
    this.extensionFormGroup.get('extensionCtrl').setValue(ext);
  }

  public addImage() {
    this.imageInput.nativeElement.click();
  }

  public openUploadDialog() {
    let dialogRef = this.dialog.open(imageUploadDialogComponent, { width: '400px' });
  }

  private enableEditMode(on: boolean) {
    this.editOrAdd = on === true ? "Edit" : "Add";
    if(on) {
      this.movieService.getMovies().subscribe((movies: Movie[]) => {
        this.movies = movies;
        this.navService.sendVideoArray(this.movies);
      });
    }
  }

  ngOnInit() {
    this.imgService.getId().subscribe(path => {
      this.posterFormGroup.get("posterCtrl").setValue(path );
    })

    this.route.queryParams.subscribe((params) => {
      this.editMode = params.edit;
      if(this.editMode) {
        this.enableEditMode(true);
      } else {
        this.enableEditMode(false);
      }
    });

    this.navService.getId().subscribe(id => {
      let movie = this.movies.find(movie => movie._id === id);
      console.log(console.log(movie));
    });

    this.movieTitleFormGroup = this._formBuilder.group({
      movieTitleFormControl: ['', Validators.required]
    });
    this.extensionFormGroup = this._formBuilder.group({
      extensionCtrl: ['', Validators.required]
    });
    this.directorFormGroup = this._formBuilder.group({
      directorCtrl: ['', Validators.required]
    });
    this.synopsisFormGroup = this._formBuilder.group({
      synopsisCtrl: ['', Validators.required]
    });
    this.genreFormGroup = this._formBuilder.group({
      genreCtrl: ['', Validators.required]
    });
    this.posterFormGroup = this._formBuilder.group({
      posterCtrl: ['', Validators.required]
    });

    for (let item in EMovieGenres) {
      if(typeof EMovieGenres[item] === 'string') {
        if(EMovieGenres[item] != 'all')
          this.genres.push(<any>EMovieGenres[item]);
      }
    }
  }

  submit() {
    let title: string = this.movieTitleFormGroup.get('movieTitleFormControl').value;
    let titleNoSpaces = title.split(" ").join("").toLowerCase();
    let extension = this.extensionFormGroup.get('extensionCtrl').value;
    let titlePath = 'assets/movies/' + titleNoSpaces + '/' + titleNoSpaces + '.' + extension.toLowerCase();
    let director = this.directorFormGroup.get('directorCtrl').value;
    let synopsis = this.synopsisFormGroup.get('synopsisCtrl').value;
    let genre = this.genreFormGroup.get('genreCtrl').value;
    let poster = this.posterFormGroup.get('posterCtrl').value;

    let movie: Movie = {
      director: director,
      genre: genre,
      location: titlePath,
      synopsis: synopsis,
      title: title,
      posterLocation: poster
    }
    if(this.editMode) {
      movie._id = this.selectedMovie._id;
      this.movieService.putMovie(movie).subscribe(res => {
        if(res['success'] === true )
          this.toastr.success('Movie update completed', 'Result');
        else
          this.toastr.success(res['msg'], 'Result');
      });
    } else {
      this.movieService.postMovie(movie).subscribe(res => {
        console.log(res);
      });
    }
  }

}



