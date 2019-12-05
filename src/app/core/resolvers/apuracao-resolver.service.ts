import { Apuracao } from '@shared/models/apuracao';
import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EleicoesApiService } from '../api/eleicoes-api.service';


@Injectable({
  providedIn: 'root'
})
export class ApuracaoResolverService implements Resolve<Apuracao[]> {

  constructor(private api: EleicoesApiService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Apuracao[]> {
    if (route.paramMap.has('id')) {
      const id: number = +route.paramMap.get('id');
      return this.api.getApuracao(id).pipe(
        catchError(_ => {
          // this.router.navigate(['/not-found']);
          return of(null);
        })
      );
    } else {
      this.router.navigate(['/not-found']);
    }
  }

}
