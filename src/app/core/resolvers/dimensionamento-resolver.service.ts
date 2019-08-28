import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EleicoesApiService } from '../api/eleicoes-api.service';
import { Dimensionamento } from 'src/app/shared/models/dimensionamento';


@Injectable({
  providedIn: 'root'
})
export class DimensionamentoResolverService implements Resolve<Dimensionamento[]> {

  constructor(private api: EleicoesApiService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Dimensionamento[]> {
    if (route.paramMap.has('id')) {
      const id: number = +route.paramMap.get('id');
      return this.api.getDimensionamento(id).pipe(
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
