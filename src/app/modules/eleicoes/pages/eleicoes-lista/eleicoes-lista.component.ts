import { Component, OnInit } from '@angular/core';

import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { Eleicao } from 'src/app/shared/models/eleicao';
import { PagedResult } from 'src/app/shared/models/paged-result';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { AuthInfo, Perfil } from 'src/app/shared/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { CodigoEtapaObrigatoria } from 'src/app/shared/models/cronograma';
import { tap, filter, switchMap } from 'rxjs/operators';
import { from, forkJoin, of } from 'rxjs';

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
    const http = this.eleicoesApi.getAll({ pageSize: this.paginationInfo.pageSize, pageNumber: this.paginationInfo.currentPage });
    http.pipe(
      tap((eleicoes: PagedResult<Eleicao>) => {
        this.paginationInfo = eleicoes;
        this.eleicoes = eleicoes.result;
      })).subscribe(_ => {
        if (this.authInfo.perfil === Perfil.Eleitor) {
          from(this.eleicoesEtapaSuperiorInscricoes)
            .pipe(
              switchMap(eleicao => forkJoin({
                eleicao: of(eleicao),
                candidato: this.eleicoesApi.getCandidato(eleicao.id),
                voto: this.eleicoesApi.getVotoUsuario(eleicao.id)
              }))).subscribe(dados => {
                dados.eleicao.candidato = dados.candidato;
                dados.eleicao.voto = dados.voto;
              });
        }
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


  get eleicoesEtapaSuperiorInscricoes(): Eleicao[] {
    if (!this.eleicoes || !this.eleicoes.length) { return []; }
    return this.eleicoes.filter(e => e.inscricoesFinalizadas ||
      (e.etapaAtual && e.etapaAtual.etapaObrigatoriaId === CodigoEtapaObrigatoria.Inscricao));
  }


}
