import { Importacao, StatusImportacao, ProgressoImportacao } from '@shared/models/importacao';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-importacao-alert',
  templateUrl: './importacao-alert.component.html',
  styleUrls: ['./importacao-alert.component.css']
})
export class ImportacaoAlertComponent implements OnInit {

  @Input() ultimaImportacao: Importacao;
  @Input() progresso: ProgressoImportacao;
  StatusImportacao = StatusImportacao;

  constructor() { }

  ngOnInit() {
  }
  get alertStatusImportacao(): string {
    if (!this.ultimaImportacao) { return ''; }
    switch (this.ultimaImportacao.status) {
      case StatusImportacao.Aguardando:
        return 'alert-primary';
      case StatusImportacao.Processando:
        return 'alert-warning';
      case StatusImportacao.FinalizadoComFalha:
        return 'alert-danger';
      case StatusImportacao.FinalizadoComSucesso:
        return 'alert-success';
      default:
        return '';
    }
  }

}
