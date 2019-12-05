import { EstabelecimentosApiService } from './../api/estabelecimentos-api.service';
import { EmpresasApiService } from 'src/app/core/api/empresas-api.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Eleicao } from '@shared/models/eleicao';
import { Empresa } from '@shared/models/empresa';


@Injectable({
  providedIn: 'root'
})
export class EmpresaResolverService implements Resolve<Empresa> {

  constructor(
    private api: EmpresasApiService,
    private estabelecimentosApi: EstabelecimentosApiService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Empresa> {
    if (route.paramMap.has('id')) {
      const id: number = +route.paramMap.get('id');
      return forkJoin([this.api.get(id), this.estabelecimentosApi.getAll({ empresaId: id })])
        .pipe(
          map(retorno => {
            return {
              ...retorno[0],
              ...{ estabelecimentos: retorno[1] }
            };
          }),
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
