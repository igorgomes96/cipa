import { Component, OnInit, Input } from '@angular/core';
import { Dimensionamento } from '@shared/models/dimensionamento';

@Component({
  selector: 'app-etapa-dimensionamento',
  templateUrl: './etapa-dimensionamento.component.html',
  styleUrls: ['./etapa-dimensionamento.component.css']
})
export class EtapaDimensionamentoComponent implements OnInit {

  @Input() dimensionamento: Dimensionamento;
  @Input() codigoGrupo: string;
  ultimaAtualizacao: Date;
  constructor() { }

  ngOnInit() {
    this.ultimaAtualizacao = new Date();
  }

  get possuiQtdaMinimaInscricoes() {
    return this.dimensionamento &&
      this.dimensionamento.qtdaInscricoesAprovadas >= (this.dimensionamento.qtdaEfetivos + this.dimensionamento.qtdaSuplentes);
  }

}
