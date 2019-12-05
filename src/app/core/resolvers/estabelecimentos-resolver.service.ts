import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EstabelecimentosApiService } from '../api/estabelecimentos-api.service';
import { Estabelecimento } from '@shared/models/estabelecimento';


@Injectable({
  providedIn: 'root'
})
export class EstabelecimentosResolverService implements Resolve<Estabelecimento[]> {

  constructor(private api: EstabelecimentosApiService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Estabelecimento[]> {
    return this.api.getAll().pipe(
      catchError(_ => {
        this.router.navigate(['/not-found']);
        return of(null);
      })
    );
  }

}
