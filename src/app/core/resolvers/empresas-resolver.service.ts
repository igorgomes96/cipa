import { EmpresasApiService } from 'src/app/core/api/empresas-api.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Eleitor } from '../../shared/models/eleitor';


@Injectable({
  providedIn: 'root'
})
export class EmpresasResolverService implements Resolve<Eleitor> {

  constructor(private api: EmpresasApiService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Eleitor> {
      return this.api.getAll().pipe(
        catchError(_ => {
          this.router.navigate(['/not-found']);
          return of(null);
        })
      );
  }

}
