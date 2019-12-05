import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Eleitor } from '@shared/models/eleitor';
import { EleicoesApiService } from '../api/eleicoes-api.service';


@Injectable({
  providedIn: 'root'
})
export class EleitorResolverService implements Resolve<Eleitor> {

  constructor(private api: EleicoesApiService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Eleitor> {
    if (route.paramMap.has('id')) {
      const eleicaoId = route.parent.params.id;
      const id: number = +route.paramMap.get('id');
      return this.api.getEleitor(eleicaoId, id).pipe(
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
