import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Usuario } from '@shared/models/usuario';
import { LoginApiService } from '../api/login-api.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CodigoRecuperacaoResolverService implements Resolve<Usuario> {

    constructor(private api: LoginApiService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario> {
        if (route.paramMap.has('codigo')) {
            const codigo: string = route.paramMap.get('codigo');
            return this.api.buscaPeloCodigoRecuperacao(codigo).pipe(
                catchError(_ => {
                    this.router.navigate(['/autenticacao/login']);
                    return of(null);
                })
            );
        } else {
            this.router.navigate(['/autenticacao/login']);
        }
    }

}
