import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { Eleicao } from 'src/app/shared/models/eleicao';
import { ModalService } from 'src/app/core/services/modal.service';
import { PagedResult } from 'src/app/shared/models/paged-result';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-eleicoes-lista',
  templateUrl: './eleicoes-lista.component.html',
  styleUrls: ['./eleicoes-lista.component.css']
})
export class EleicoesListaComponent implements OnInit {

  paginationInfo: PagedResult<Eleicao> = {
    currentPage: 1,
    pageSize: 10,
    pageCount: 0,
    result: [],
    totalRecords: 0
  };
  eleicoes: Eleicao[] = [];
  constructor(
    private eleicoesApi: EleicoesApiService) { }

  ngOnInit() {
    this.carregaEleicoes();
  }


  carregaEleicoes() {
    this.eleicoesApi.getAll({ pageSize: this.paginationInfo.pageSize, pageNumber: this.paginationInfo.currentPage })
    .subscribe((eleicoes: PagedResult<Eleicao>) => {
      this.paginationInfo = eleicoes;
      this.eleicoes = eleicoes.result;
    });
  }

  editar(eleicao: Eleicao) {
    console.log(eleicao);
  }

}
