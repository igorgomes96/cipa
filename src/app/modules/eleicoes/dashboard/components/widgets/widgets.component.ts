import { Component, OnInit, Input } from '@angular/core';
import { Dimensionamento } from '@shared/models/dimensionamento';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {

  @Input() dimensionamento: Dimensionamento;
  constructor() { }

  ngOnInit() {
  }

  get qtdaNaoVotantes(): number {
    return this.dimensionamento.qtdaEleitores - this.dimensionamento.qtdaVotos;
  }

  get percentualVotos(): number {
    return this.dimensionamento.qtdaVotos / this.dimensionamento.qtdaEleitores;
  }

  get possuiQtdaMinimaVotos(): boolean {
    return this.dimensionamento.qtdaVotos >= this.dimensionamento.qtdaMinimaVotos;
  }

}
