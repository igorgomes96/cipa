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
    this.eleicoesApi.getAll({
      status: 'aberta'
    })
      .subscribe((eleicoes: Eleicao[]) => {
        this.eleicoes = eleicoes;
      });
  }


  carregarEleicoesFinalizadas() {
    this.eleicoesApi.getAll({ status: 'finalizada' })
      .subscribe((eleicoesFinalizadas: Eleicao[]) => {
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
