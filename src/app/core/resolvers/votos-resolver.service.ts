import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EleicoesApiService } from '../api/eleicoes-api.service';
import { Voto } from 'src/app/shared/models/voto';


@Injectable({
  providedIn: 'root'
})
export class VotosResolverService implements Resolve<Voto[]> {

  constructor(private api: EleicoesApiService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Voto[]> {
    if (route.paramMap.has('id')) {
      const id: number = +route.paramMap.get('id');
      return this.api.getVotos(id).pipe(
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
