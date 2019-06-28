import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { Eleicao } from 'src/app/shared/models/eleicao';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-eleicoes-lista',
  templateUrl: './eleicoes-lista.component.html',
  styleUrls: ['./eleicoes-lista.component.css']
})
export class EleicoesListaComponent implements OnInit {

  eleicoes: Eleicao[];
  constructor(private eleicoesApi: EleicoesApiService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.eleicoesApi.getAll()
    .subscribe((eleicoes: Eleicao[]) => {
      this.eleicoes = eleicoes;
    });
  }

  exibirEleicoes() {
  }

}
