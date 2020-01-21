import { Component, OnInit } from '@angular/core';

import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { Eleicao } from '@shared/models/eleicao';
import { PagedResult } from '@shared/models/paged-result';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { AuthInfo, Perfil } from '@shared/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { CodigoEtapaObrigatoria, EtapaObrigatoria } from '@shared/models/cronograma';
import { tap, switchMap, filter, delay } from 'rxjs/operators';
import { from, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-eleicoes-lista',
  templateUrl: './eleicoes-lista.component.html',
  styleUrls: ['./eleicoes-lista.component.css']
})
export class EleicoesListaComponent implements OnInit {

  // paginationInfo: PagedResult<Eleicao> = {
  //   currentPage: 1,
  //   pageSize: 100,
  //   pageCount: 0,
  //   result: [],
  //   totalRecords: 0
  // };
  eleicoes: Eleicao[];
  eleicoesFinalizadas: Eleicao[];
  authInfo: AuthInfo;
  Perfil = Perfil;

  constructor(
    private eleicoesApi: EleicoesApiService,
    private toast: ToastsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.authInfo = this.authService.authInfo;
    this.carregaEleicoes();
  }


  carregaEleicoes() {
    const http = this.eleicoesApi.getAll({
      status: 'aberta'
    });
    http.pipe(
      tap((eleicoes: Eleicao[]) => {
        this.eleicoes = eleicoes;
        // this.paginationInfo = eleicoes;
        // this.eleicoes = eleicoes.result;
      }),
      delay(1000),
      switchMap(_ => this.eleicoesApi.getAll({ status: 'finalizada' }))
    ).subscribe((eleicoesFinalizadas: Eleicao[]) => {
      this.eleicoesFinalizadas = eleicoesFinalizadas;
    });
  }

  buscaEleicao(id: number): Eleicao {
    return this.eleicoes.find(e => e.id === id);
  }

  excluir(eleicao: Eleicao) {
    this.eleicoesApi.delete(eleicao.id)
      .subscribe(_ => {
        this.toast.showMessage({
          message: 'Eleição excluída com sucesso!',
          title: 'Sucesso',
          type: ToastType.success
        });
        this.carregaEleicoes();
      });
  }

  get perfilComAcessoCriacao(): boolean {
    return this.authInfo && (this.authInfo.perfil === Perfil.SESMT || this.authInfo.perfil === Perfil.Administrador);
  }


}
