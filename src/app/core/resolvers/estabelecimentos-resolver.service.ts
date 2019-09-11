import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Eleitor } from '../../shared/models/eleitor';
import { EstabelecimentosApiService } from '../api/estabelecimentos-api.service';


@Injectable({
  providedIn: 'root'
})
export class EstabelecimentosResolverService implements Resolve<Eleitor> {

  constructor(private api: EstabelecimentosApiService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Eleitor> {
      return this.api.getAll().pipe(
        catchError(_ => {
          this.router.navigate(['/not-found']);
          return of(null);
        })
      );
  }

}
