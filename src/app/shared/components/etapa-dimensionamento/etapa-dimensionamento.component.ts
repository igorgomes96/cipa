import { Dimensionamento } from '../../models/dimensionamento';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-etapa-dimensionamento',
  templateUrl: './etapa-dimensionamento.component.html',
  styleUrls: ['./etapa-dimensionamento.component.css']
})
export class EtapaAlertComponent implements OnInit {

  @Input() dimensionamento: Dimensionamento;
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
