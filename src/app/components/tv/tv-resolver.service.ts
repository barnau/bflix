import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TvService } from 'src/app/services/tv.service';

@Injectable({
  providedIn: 'root'
})
export class TvResolverService implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.tvService.getTvShows().map(shows => shows);
  }

  constructor(private tvService: TvService) { }
}
