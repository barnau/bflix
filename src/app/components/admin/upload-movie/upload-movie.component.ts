import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-upload-movie',
  templateUrl: './upload-movie.component.html',
  styleUrls: ['./upload-movie.component.css']
})
export class UploadMovieComponent implements OnInit {
  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(100)
  ]);

  locationFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(200)
  ]);

  directorFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(50)
  ]);

  synopsisFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(300)
  ]);

  genreFormControl = new FormControl('', [
    Validators.required,
  ]);



  matcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit() {
  }

}
