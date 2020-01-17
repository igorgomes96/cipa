import { ToastsService } from 'src/app/core/services/toasts.service';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ResultadoApuracao, Apuracao, Resultado } from '@shared/models/apuracao';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { Eleicao } from '@shared/models/eleicao';
import { ToastType } from '@core/components/toasts/toasts.component';

@Component({
  selector: 'app-relacao-candidatos',
  templateUrl: './relacao-candidatos.component.html',
  styleUrls: ['./relacao-candidatos.component.css']
})
export class RelacaoCandidatosComponent implements OnInit {

  @Input() eleicao: Eleicao;
  @Input() resultado: ResultadoApuracao;
  @Input() downloadRelatorio = new EventEmitter<{}>();
  constructor(private eleicoesApi: EleicoesApiService, private toast: ToastsService) { }

  ngOnInit() {
    this.downloadRelatorio.subscribe(_ => this.download());
  }

  get candidatos(): Apuracao[] {
    return !this.resultado ? [] : this.resultado.efetivos.concat(this.resultado.suplentes).concat(this.resultado.naoEleitos);
  }

  resultadoClass(candidato: Apuracao): string {
    switch (candidato.resultadoApuracao) {
      case Resultado.Efetivo:
        return 'label-primary';
      case Resultado.Suplente:
        return 'label-success';
      case Resultado.NaoEleito:
        return 'label-danger';
      default:
        return '';
    }
  }

  registrarResultadoApuracao() {
    this.eleicoesApi.postRegistrarResultado(this.eleicao.id)
      .subscribe(_ => this.toast.showMessage({
        message: 'Resultado da apuração registrado!',
        title: 'Sucesso',
        type: ToastType.success
      }));
  }

  private download() {
    this.eleicoesApi.downloadRelatorioInscricoes(this.eleicao.id, 'Inscricoes.xlsx').subscribe();
  }

}
