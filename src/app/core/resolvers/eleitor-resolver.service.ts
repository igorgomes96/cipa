import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EleitoresApiService } from '../api/eleitores-api.service';
import { Eleitor } from '../models/eleitor';


@Injectable({
  providedIn: 'root'
})
export class EleitorResolverService implements Resolve<Eleitor> {

  constructor(private api: EleitoresApiService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Eleitor> {
    if (route.paramMap.has('id')) {
      const id: number = +route.paramMap.get('id');
      return this.api.get(id).pipe(
        catchError(_ => {
          this.router.navigate(['/not-found']);
          return of(null);
        })
      );
    } else {
      this.router.navigate(['/not-found']);
    }
  }

}
