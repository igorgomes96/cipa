import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Eleitor } from 'src/app/shared/models/eleitor';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, distinctUntilChanged, debounce, debounceTime } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EleitoresApiService } from 'src/app/core/api/eleitores-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';
import { Eleicao } from 'src/app/shared/models/eleicao';
import { PagedResult } from 'src/app/shared/models/paged-result';
import { ImportacoesApiService } from 'src/app/core/api/importacoes-api.service';
import { Importacao, ProgressoImportacao } from 'src/app/shared/models/importacao';

declare var $: any;

@Component({
  selector: 'app-eleitores-lista',
  templateUrl: './eleitores-lista.component.html',
  styleUrls: ['./eleitores-lista.component.css']
})
export class EleitoresListaComponent implements OnInit {

  eleitores: PagedResult<Eleitor> = {
    currentPage: 1,
    pageCount: 0,
    pageSize: 50,
    result: [],
    totalRecords: 0
  };
  eleicao: Eleicao;
  form: FormGroup;
  ultimaImportacao: Importacao;
  progresso: ProgressoImportacao;

  constructor(
    private eleicoesApi: EleicoesApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private eleitoresApi: EleitoresApiService,
    private toasts: ToastsService,
    private importacoesApi: ImportacoesApiService) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        switchMap(routeData => {
          this.eleicao = routeData.eleicao;
          this.carregaUltimaImportacao();
          return this.eleicoesApi.getEleitores(this.eleicao.id, this.pageParams);
        })
      ).subscribe((eleitores: PagedResult<Eleitor>) => {
        this.eleitores = eleitores;
      });

    this.form = this.formBuilder.group({
      filtro: ['']
    });
    this.form.get('filtro').valueChanges
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((value: any) => {
        //console.log(value);
      });

    this.importacoesApi.progressoImportacao()
      .subscribe(valor => {
        if (valor && !this.progresso) {
          this.carregaUltimaImportacao();
        }
        valor.progresso = valor.progresso * 100;
        this.progresso = valor;
      });

  }

  carregaUltimaImportacao() {
    this.importacoesApi.getUltimaImportacao(this.eleicao.id)
      .subscribe(importacao => {
        this.ultimaImportacao = importacao;
      });
  }

  get pageParams(): any {
    return { pageSize: this.eleitores.pageSize, pageNumber: this.eleitores.currentPage };
  }

  carregaEleitores() {
    return this.eleicoesApi.getEleitores(this.eleicao.id, this.pageParams)
      .subscribe((eleitores: PagedResult<Eleitor>) => {
        this.eleitores = eleitores;
      });
  }

  alteraPagina(pagina: number) {
    this.eleitores.currentPage = pagina;
    this.carregaEleitores();
  }

  alteraTamanhoPagina(tamanhoPagina: number) {
    this.eleitores.pageSize = tamanhoPagina;
    this.carregaEleitores();
  }

  excluir(id: number) {
    this.toasts.confirm('Deseja mesmo excluir esse eleitor?')
      .subscribe((confirmacao: boolean) => {
        if (confirmacao) {
          this.eleitoresApi.delete(id)
            .subscribe(_ => {
              this.toasts.showMessage({
                message: 'Eleitor excluído com sucesso!',
                title: 'Sucesso!',
                type: ToastType.success
              });
              this.carregaEleitores();
            });
        }
      });
  }


}
