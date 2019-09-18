import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EleicoesApiService } from '../api/eleicoes-api.service';
import { map } from 'rxjs/operators';
import { ToastsService } from '../services/toasts.service';
import { ToastType } from '../components/toasts/toasts.component';
import { CodigoEtapaObrigatoria } from 'src/app/shared/models/cronograma';

@Injectable({
    providedIn: 'root'
})
export class EtapaCandidaturaGuard implements CanActivate {

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
            return this.eleicoesApi.get(id)
                .pipe(map(eleicao => {
                    if (!eleicao) {
                        this.toasts.showMessage({
                            message: 'Eleição não encontrada.',
                            title: 'Inválido!',
                            type: ToastType.error
                        });
                        this.router.navigate(['/eleicoes']);
                        return false;
                    }
                    if (!eleicao.etapaAtual || eleicao.etapaAtual.etapaObrigatoriaId !== CodigoEtapaObrigatoria.Inscricao) {
                        this.toasts.showMessage({
                            message: 'Esta eleição não está no período de incrições!',
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
