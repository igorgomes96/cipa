import { ArquivosApiService } from 'src/app/core/api/arquivos-api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Eleitor } from '@shared/models/eleitor';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { Eleicao } from '@shared/models/eleicao';
import { PagedResult } from '@shared/models/paged-result';
import { ImportacoesApiService } from 'src/app/core/api/importacoes-api.service';
import { Importacao, ProgressoImportacao, StatusImportacao } from '@shared/models/importacao';
import { Subscription } from 'rxjs';
import { downloadArquivo, inputPesquisa } from '@shared/rxjs-operators';
import { CodigoEtapaObrigatoria } from '@shared/models/cronograma';

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
  importacaoFinalizadaSubscriber: Subscription;
  CodigoEtapaObrigatoria = CodigoEtapaObrigatoria;

  constructor(
    private eleicoesApi: EleicoesApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
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
      .pipe(inputPesquisa())
      .subscribe((value: any) => {
        this.filtro = value;
        this.carregaEleitores();
      });

    this.progressoSubscriber = this.importacoesApi.progressoImportacao()
      .subscribe(valor => {
        if (valor && valor.progresso < 100) {
          this.ultimaImportacao.status = StatusImportacao.Processando;
        }
        this.progresso = valor;
      });

    this.importacaoFinalizadaSubscriber = this.importacoesApi.importacaoFinalizada()
      .subscribe(_ => {
        this.progresso = null;
        this.carregaUltimaImportacao();
        this.carregaEleitores();
      });
  }

  ngOnDestroy(): void {
    this.progressoSubscriber.unsubscribe();
    this.importacaoFinalizadaSubscriber.unsubscribe();
  }

  downloadTemplate() {
    this.arquivosApi.downloadTemplateImportacao('Importacao CIPA.xlsx').subscribe();
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
      $event.target['value'] = '';
      return;
    }
    this.eleicoesApi.postImportacao(this.eleicao.id, files)
      .pipe(finalize(() => {
        $event.target['value'] = '';
      }))
      .subscribe((importacao: Importacao) => {
        this.ultimaImportacao = importacao;
        this.toasts.showMessage({
          message: 'O arquivo foi colocado na fila de processamento!',
          title: 'Sucesso!',
          type: ToastType.success
        });
      });
  }

  carregaUltimaImportacao() {
    this.eleicoesApi.getUltimaImportacao(this.eleicao.id)
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
    this.toasts.confirmModal('Deseja mesmo excluir esse eleitor?')
      .subscribe((confirmacao: boolean) => {
        if (confirmacao) {
          this.eleicoesApi.deleteEleitor(this.eleicao.id, id)
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
    this.toasts.confirmModal('Deseja mesmo excluir todos os eleitores dessa eleição?\nEssa ação não pode ser desfeita.')
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
