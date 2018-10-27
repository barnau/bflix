import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CommonValues } from '../common/commonValues';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getTvShows() {
    let httpOptions = this.auth.getHttpOptions();
    return this.http.get(CommonValues.devApi + '/tvshow', httpOptions)
  }
}
