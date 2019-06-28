import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtapaCronograma, PosicaoEtapa } from 'src/app/shared/models/cronograma';
import { Eleicao } from 'src/app/shared/models/eleicao';
import { filter, switchMap } from 'rxjs/operators';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { Arquivo } from 'src/app/shared/models/arquivo';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { CronogramaApiService } from 'src/app/core/api/cronograma-api.service';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {

  PosicaoEtapa: typeof PosicaoEtapa = PosicaoEtapa;
  eleicao: Eleicao;
  arquivos: Arquivo[];
  templates: Arquivo[];
  @ViewChild('modalTemplates') modalTemplates: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
              private eleicoesApi: EleicoesApiService,
              private cronogramaApi: CronogramaApiService,
              private toasts: ToastsService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.route.data
    .pipe(
      filter(routeData => routeData.hasOwnProperty('eleicao')),
      switchMap(routeData => {
        this.eleicao = routeData.eleicao;
        return this.eleicoesApi.getCronograma(routeData.eleicao.id);
      })
    ).subscribe(cronograma => {
      this.eleicao.cronograma = cronograma;
    });

    this.arquivos = [
      {
        content: null,
        contentType: null,
        dataCriacao: new Date(),
        dataUpload: new Date(),
        extensao: '.xls',
        id: '1',
        nome: 'Teste.xls',
        tamanho: 23989,
        path: '/teste/teste.xls'
      }
    ];
  }

  proximaEtapa(etapa: EtapaCronograma) {
    this.toasts.showMessage({
      message: 'Message Test',
      title: 'Título Teste',
      type: ToastType.success
    });
  }

  exibirTemplates(etapa: EtapaCronograma) {
    this.cronogramaApi.getTemplates(etapa.id)
    .subscribe((arquivos: Arquivo[]) => {
      this.templates = arquivos;
      this.modalService.showModal(this.modalTemplates);
    });
  }

  atualizarEtapa(etapa: EtapaCronograma) {
    // Put Cronograma
  }

}
