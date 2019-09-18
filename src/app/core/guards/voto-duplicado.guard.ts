import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, empty, EMPTY, of } from 'rxjs';
import { EleicoesApiService } from '../api/eleicoes-api.service';
import { map, catchError } from 'rxjs/operators';
import { ToastsService } from '../services/toasts.service';
import { ToastType } from '../components/toasts/toasts.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VotoDuplicadoGuard implements CanActivate {

  constructor(
    private eleicoesApi: EleicoesApiService,
    private router: Router,
    private toasts: ToastsService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!next.paramMap.has('id')) {
      this.router.navigate(['/eleicoes']);
      return false;
    } else {
      const id = +next.paramMap.get('id');
      return this.eleicoesApi.getVotoUsuario(id)
        .pipe(
          catchError(_ => {
            this.router.navigate(['/eleicoes']);
            return of(false);
          }),
          map(voto => {
          if (voto) {
            this.toasts.showMessage({
              message: 'Você já votou nessa eleição. Não é permitido votar mais de uma vez.',
              title: 'Inválido!',
              type: ToastType.error
            });
            this.router.navigate(['/eleicoes']);
            return false;
          }
          return true;
        }));
    }
  }
}
