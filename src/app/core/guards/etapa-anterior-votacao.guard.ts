import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EleicoesApiService } from '../api/eleicoes-api.service';
import { map } from 'rxjs/operators';
import { ToastsService } from '../services/toasts.service';
import { ToastType } from '../components/toasts/toasts.component';
import { CodigoEtapaObrigatoria, PosicaoEtapa } from 'src/app/shared/models/cronograma';

@Injectable({
  providedIn: 'root'
})
export class EtapaAnteriorVotacaoGuard implements CanActivate {

  constructor(
    private eleicoesApi: EleicoesApiService,
    private router: Router,
    private toasts: ToastsService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!next.paramMap.has('id')) {
      this.router.navigate(['/home']);
      return false;
    } else {
      const id = +next.paramMap.get('id');
      return this.eleicoesApi.getCronograma(id)
        .pipe(map(cronograma => {
          const etapaAtual = cronograma
            .find(c => c.posicaoEtapa === PosicaoEtapa.Atual);
          if (!etapaAtual) {
            this.toasts.showMessage({
              message: 'Processo de eleição ainda não iniciado.',
              title: 'Aguardando início',
              type: ToastType.error
            });
            return false;
          }
          const etapaVotacao = cronograma.find(c => c.etapaObrigatoriaId === CodigoEtapaObrigatoria.Votacao);
          if (!etapaVotacao) {
            this.toasts.showMessage({
              message: 'Etapa de votação não encontrada!',
              title: 'Cronograma inválido',
              type: ToastType.error
            });
            return false;
          }
          if (etapaVotacao.ordem > etapaAtual.ordem) {
            this.toasts.showMessage({
              message: 'O acesso será liberado somente quando as votações se iniciarem!',
              title: 'Aguardando Votação',
              type: ToastType.warning
            });
            return false;
          }
          return true;
        }));
    }
  }
}
