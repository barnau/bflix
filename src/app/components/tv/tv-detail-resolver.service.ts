import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TvService } from 'src/app/services/tv.service';

@Injectable({
  providedIn: 'root'
})
export class TvDetailResolverService implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    debugger;
    let id = route.params['id'];
    return this.tvService.getTvShow(id).map(tvshow => tvshow);
  }
  constructor(private tvService: TvService ) { }
}
