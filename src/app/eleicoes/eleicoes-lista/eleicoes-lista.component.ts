import { Component, OnInit } from '@angular/core';

import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { Eleicao } from 'src/app/core/models/eleicao';

@Component({
  selector: 'app-eleicoes-lista',
  templateUrl: './eleicoes-lista.component.html',
  styleUrls: ['./eleicoes-lista.component.css']
})
export class EleicoesListaComponent implements OnInit {

  eleicoes: Eleicao[];
  constructor(private eleicoesApi: EleicoesApiService) { }

  ngOnInit() {
    this.eleicoesApi.getAll()
    .subscribe((eleicoes: Eleicao[]) => {
      this.eleicoes = eleicoes;
    });
  }

}
