import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtapaCronograma, PosicaoEtapa } from 'src/app/core/models/cronograma';
import { Eleicao } from 'src/app/core/models/eleicao';
import { filter, switchMap } from 'rxjs/operators';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { Arquivo } from 'src/app/core/models/arquivo';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {

  PosicaoEtapa: typeof PosicaoEtapa = PosicaoEtapa;
  eleicao: Eleicao;
  arquivos: Arquivo[];
  templates: string[];
  @ViewChild('modalTemplates') modalTemplates: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
              private api: EleicoesApiService,
              private toasts: ToastsService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.route.data
    .pipe(
      filter(routeData => routeData.hasOwnProperty('eleicao')),
      switchMap(routeData => {
        this.eleicao = routeData.eleicao;
        return this.api.getCronograma(routeData.eleicao.id);
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
        path: '/teste/teste.xls'
      }
    ];
  }

  calendarIcon(etapa: EtapaCronograma): string {
    switch (etapa.posicaoEtapa) {
      case PosicaoEtapa.Atual:
        return 'fa-calendar';
      case PosicaoEtapa.Passada:
        return 'fa-calendar-check-o';
      case PosicaoEtapa.Futura:
        return 'fa-calendar-o';
      default:
        return '';
    }
  }

  proximaEtapa() {
    this.toasts.showMessage({
      message: 'Message Test',
      title: 'Título Teste',
      type: ToastType.success
    });
  }

  exibirTemplates() {
    this.modalService.showModal(this.modalTemplates);
  }

}
