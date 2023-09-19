import { Apuracao } from '@shared/models/apuracao';
import { Component, OnInit, Input } from '@angular/core';
import { EleicoesApiService } from '@core/api/eleicoes-api.service';

@Component({
  selector: 'app-resultado-apuracao',
  templateUrl: './resultado-apuracao.component.html',
  styleUrls: ['./resultado-apuracao.component.css']
})
export class ResultadoApuracaoComponent implements OnInit {

  @Input() apuracao: Apuracao[];

  constructor() { }

  ngOnInit() {
  }

  colocacao(indice: number) {
    return indice + 1;
  }

}
