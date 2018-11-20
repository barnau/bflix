import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private pathSubject = new Subject<any>();
  

  sendId(path: string) {
    this.pathSubject.next(path);
  }
  
  clearId() {
      this.pathSubject.next();
  }
  
  getId(): Observable<any> {
      return this.pathSubject.asObservable();
  }

  constructor() { }
}
