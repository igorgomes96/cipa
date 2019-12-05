import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EleicoesApiService } from '../api/eleicoes-api.service';
import { map } from 'rxjs/operators';
import { ToastsService } from '../services/toasts.service';
import { ToastType } from '../components/toasts/toasts.component';

@Injectable({
    providedIn: 'root'
})
export class EleitorGuard implements CanActivate {

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
            return this.eleicoesApi.getEleitorUsuario(id)
                .pipe(map(eleitor => {
                    if (!eleitor) {
                        this.toasts.showMessage({
                            message: 'Você não está cadastrado nessa eleição!',
                            title: 'Inválido',
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
