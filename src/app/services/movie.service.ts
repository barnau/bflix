import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonValues } from '../common/commonValues';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // private options: any = {'headers': new HttpHeaders({'Content-Type': 'application/json'})}
  // private apiBase: string = CommonValues.devApi;
  // private currentUser: User = JSON.parse(localStorage.getItem(CommonValues.localStorageLoggedInUser)) || new User();


  constructor(private http: HttpClient, private auth: AuthService) { }

  

  getMovies() {
    let httpOptions = this.auth.getHttpOptions();
    return this.http.get(CommonValues.devApi + '/movie', httpOptions);
        // this.http.get('/api/movie', httpOptions).subscribe(data => {
        //   this.movies = data;
        //   console.log(this.movies);
        // }, err => {
        //   if(err.status === 401) {
        //     this.router.navigate(['login']);
        //   }
        // })
  }

  getMovieStream(movieId: string) {
    let httpOptions = this.auth.getHttpOptions();
    let url = CommonValues.devApi + '/player/' + movieId;
    return this.http.get(url, httpOptions);
  }

}
