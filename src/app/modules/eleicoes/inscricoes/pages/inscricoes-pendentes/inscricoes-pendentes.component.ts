import { Component, OnInit } from '@angular/core';

import { TipoCardEleitor } from '@shared/components/card-inscricao/card-inscricao.component';
import { Inscricao, Reprovacao, StatusAprovacao } from '@shared/models/inscricao';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Eleicao } from '@shared/models/eleicao';

@Component({
  selector: 'app-inscricoes-pendentes',
  templateUrl: './inscricoes-pendentes.component.html',
  styleUrls: ['./inscricoes-pendentes.component.css']
})
export class InscricoesPendentesComponent implements OnInit {

  TipoCardEleitor: typeof TipoCardEleitor = TipoCardEleitor;
  candidatos: Inscricao[];
  eleicao: Eleicao;

  constructor(
    private eleicoesApi: EleicoesApiService,
    private route: ActivatedRoute,
    private toasts: ToastsService) { }

  ngOnInit() {
    this.loadCandidatos();
  }

  loadCandidatos() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        switchMap(routeData => {
          this.eleicao = routeData.eleicao;
          return this.eleicoesApi.getInscricoes(routeData.eleicao.id, StatusAprovacao.Pendente);
        })
      ).subscribe((candidatos: Inscricao[]) => {
        this.candidatos = candidatos;
      });
  }

  aprovacao(candidato: Inscricao) {
    this.toasts.confirm('Uma vez aprovada, não será possível reverter essa inscrição.', 'Confirma aprovação?')
      .subscribe((confirmacao: boolean) => {
        if (confirmacao) {
          this.eleicoesApi.putAprovarInscricao(this.eleicao.id, candidato.id)
            .subscribe(_ => {
              this.toasts.showMessage({
                message: 'Inscrição Aprovada!',
                title: 'Sucesso!',
                type: ToastType.success
              });
              this.loadCandidatos();
            });
        }
      });
  }

  reprovacao(reprovacao: Reprovacao) {
    this.eleicoesApi.putReprovarInscricao(this.eleicao.id, reprovacao.inscricaoId, reprovacao)
      .subscribe(_ => {
        this.toasts.showMessage({
          message: 'Inscrição Reprovada!',
          title: 'Sucesso!',
          type: ToastType.success
        });
        this.loadCandidatos();
      });
  }

}
