import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { VideoBase } from '../models/videoBase';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  private idSubject = new Subject<any>();
  private videoArraySubject = new Subject<any>();
  //navState$ = this.subject.asObservable();

  sendId(id: string) {
    this.idSubject.next({ id: id });
  }
  
  clearId() {
      this.idSubject.next();
  }
  
  getId(): Observable<any> {
      return this.idSubject.asObservable();
  }

  sendVideoArray(vba: VideoBase[]) {
    
    this.videoArraySubject.next({ videoBaseArray: vba });
  }
  
  clearVideoArray() {
      this.videoArraySubject.next();
  }
  
  getVideoArray(): Observable<any> {
      return this.videoArraySubject.asObservable();
  }



  constructor() { }
}
