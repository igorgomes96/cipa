import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cronograma-padrao',
  templateUrl: './cronograma-padrao.component.html',
  styleUrls: ['./cronograma-padrao.component.css']
})
export class CronogramaPadraoComponent implements OnInit {

  etapas = [
    { titulo: 'Etapa 1', descricao: 'Descrição da Etapa 1' },
    { titulo: 'Etapa 2', descricao: 'Descrição da Etapa 2' },
    { titulo: 'Etapa 3', descricao: 'Descrição da Etapa 3' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
