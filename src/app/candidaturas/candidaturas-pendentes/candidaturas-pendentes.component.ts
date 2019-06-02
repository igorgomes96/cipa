import { Component, OnInit } from '@angular/core';

import { TipoCardEleitor } from 'src/app/shared/components/card-candidato/card-candidato.component';
import { Candidato, Reprovacao } from 'src/app/core/models/candidato';
import { CandidatosApiService } from 'src/app/core/api/candidatos-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';

@Component({
  selector: 'app-candidaturas-pendentes',
  templateUrl: './candidaturas-pendentes.component.html',
  styleUrls: ['./candidaturas-pendentes.component.css']
})
export class CandidaturasPendentesComponent implements OnInit {

  TipoCardEleitor: typeof TipoCardEleitor = TipoCardEleitor;
  candidatos: Candidato[];
  constructor(private candidatosApi: CandidatosApiService,
    private toasts: ToastsService) { }

  ngOnInit() {
    this.loadCandidatos();
  }

  loadCandidatos() {
    this.candidatosApi.getAll()
      .subscribe((candidatos: Candidato[]) => {
        this.candidatos = candidatos;
      });
  }

  aprovacao(candidato: Candidato) {
    this.toasts.confirm('Uma vez aprovada, não será possível reverter essa candidatura.', 'Confirma aprovação?')
      .subscribe((confirmacao: boolean) => {
        if (confirmacao) {
          this.candidatosApi.postAprovar(candidato.id)
            .subscribe(_ => this.toasts.showMessage({
              message: 'Candidatura Aprovada!',
              title: 'Sucesso!',
              type: ToastType.success
            }));
        }
      });
  }

  reprovacao(reprovacao: Reprovacao) {
    this.candidatosApi.postReprovar(reprovacao.candidatoId, reprovacao)
      .subscribe((novaReprovacao: Reprovacao) => {
        this.toasts.showMessage({
          message: 'Candidatura Reprovada!',
          title: 'Sucesso!',
          type: ToastType.success
        });
        this.loadCandidatos();
      });
  }

}
