import { ArquivosApiService } from 'src/app/core/api/arquivos-api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Eleitor } from 'src/app/shared/models/eleitor';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EleitoresApiService } from 'src/app/core/api/eleitores-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';
import { Eleicao } from 'src/app/shared/models/eleicao';
import { PagedResult } from 'src/app/shared/models/paged-result';
import { ImportacoesApiService } from 'src/app/core/api/importacoes-api.service';
import { Importacao, ProgressoImportacao, StatusImportacao } from 'src/app/shared/models/importacao';
import { Subscriber, Subscription, Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-eleitores-lista',
  templateUrl: './eleitores-lista.component.html',
  styleUrls: ['./eleitores-lista.component.css']
})
export class EleitoresListaComponent implements OnInit, OnDestroy {

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
  filtro: string;
  StatusImportacao = StatusImportacao;
  progressoSubscriber: Subscription;

  constructor(
    private eleicoesApi: EleicoesApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private eleitoresApi: EleitoresApiService,
    private toasts: ToastsService,
    private importacoesApi: ImportacoesApiService,
    private arquivosApi: ArquivosApiService) { }

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
        this.filtro = value;
        this.carregaEleitores();
      });

    this.progressoSubscriber = this.importacoesApi.progressoImportacao()
      .subscribe(valor => {
        if (!this.progresso) {
          this.carregaUltimaImportacao();
        }
        if (valor.progresso === 100) {
          this.progresso = null;
          this.carregaUltimaImportacao();
          this.carregaEleitores();
        } else {
          this.progresso = valor;
        }
      });
  }

  ngOnDestroy(): void {
    this.progressoSubscriber.unsubscribe();
  }

  downloadTemplate() {
    this.arquivosApi.downloadTemplateImportacao().subscribe(res => {
      const a = document.createElement('a');
      const binaryData = [];
      binaryData.push(res);
      a.href = window.URL.createObjectURL(new Blob(binaryData,
        {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }));
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.download = 'Importacao CIPA.xlsx';
      a.click();
      window.URL.revokeObjectURL(a.href);
      a.remove(); // remove the element
    });
  }

  get labelStatusImportacao(): string {
    if (!this.ultimaImportacao) { return ''; }
    switch (this.ultimaImportacao.status) {
      case StatusImportacao.Aguardando:
        return 'label-warning';
      case StatusImportacao.Processando:
        return 'label-success';
      case StatusImportacao.FinalizadoComFalha:
        return 'label-danger';
      case StatusImportacao.FinalizadoComSucesso:
        return 'label-primary';
      default:
        return '';
    }
  }

  // tslint:disable: no-string-literal
  onUploadArquivo($event: Event) {
    const files = $event.target['files'];
    if (!files || !files.length) {
      return;
    }
    if (files.length > 1) {
      this.toasts.showMessage({
        message: 'Você só pode carregar um arquivo!',
        title: 'Inválido!',
        type: ToastType.error
      });
      return;
    }
    try {
      this.eleicoesApi.postImportacao(this.eleicao.id, files)
        .subscribe((importacao: Importacao) => {
          this.ultimaImportacao = importacao;
          this.toasts.showMessage({
            message: 'O arquivo foi colocado na fila de processamento!',
            title: 'Sucesso!',
            type: ToastType.success
          });
        });
    } catch (err) {
      console.error(err);
    }
  }

  carregaUltimaImportacao() {
    this.importacoesApi.getUltimaImportacao(this.eleicao.id)
      .subscribe(importacao => {
        this.ultimaImportacao = importacao;
      });
  }

  get pageParams(): any {
    return { pageSize: this.eleitores.pageSize, pageNumber: this.eleitores.currentPage, nome: this.filtro };
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

  excluirTodos() {
    this.toasts.confirm('Deseja mesmo excluir todos os eleitores dessa eleição?')
      .pipe(
        filter(confimacao => confimacao),
        switchMap(_ => this.eleicoesApi.deleteEleitores(this.eleicao.id))
      ).subscribe(_ => {
        this.carregaEleitores();
        this.toasts.showMessage({
          message: 'Eleitores excluídos com sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
      });
  }


}
