import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtapaCronograma, PosicaoEtapa } from 'src/app/shared/models/cronograma';
import { Eleicao } from 'src/app/shared/models/eleicao';
import { filter, switchMap, finalize } from 'rxjs/operators';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { Arquivo } from 'src/app/shared/models/arquivo';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { CronogramaApiService } from 'src/app/core/api/cronograma-api.service';
import { EtapasObrigatoriasApiService } from 'src/app/core/api/etapas-obrigatorias-api.service';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {

  PosicaoEtapa: typeof PosicaoEtapa = PosicaoEtapa;
  eleicao: Eleicao;
  templates: Arquivo[];
  carregandoProximaEtapa = false;
  @ViewChild('modalTemplates', { static: false }) modalTemplates: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
              private eleicoesApi: EleicoesApiService,
              private cronogramaApi: CronogramaApiService,
              private toasts: ToastsService,
              private modalService: ModalService,
              private etapasObrigatoriasApi: EtapasObrigatoriasApiService) { }

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
  }

  proximaEtapa(_: EtapaCronograma) {
    this.carregandoProximaEtapa = true;
    this.eleicoesApi.postProximaEtapa(this.eleicao.id)
      .pipe(finalize(() => this.carregandoProximaEtapa = false))
      .subscribe((cronograma: EtapaCronograma[]) => {
        this.eleicao.cronograma = cronograma;
        this.toasts.showMessage({
          message: 'Mudança de etapa concluída com Sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
      });

  }

  exibirTemplates(etapa: EtapaCronograma) {
    this.etapasObrigatoriasApi.getTemplates(etapa.id)
    .subscribe((arquivos: Arquivo[]) => {
      this.templates = arquivos;
      this.modalService.showModal(this.modalTemplates);
    });
  }

  updateCronograma() {
    this.eleicoesApi.getCronograma(this.eleicao.id)
      .subscribe(cronograma => {
        this.eleicao.cronograma = cronograma;
      });
  }

  atualizarEtapa(etapa: EtapaCronograma) {
    this.cronogramaApi.put(etapa.id, etapa)
      .pipe(finalize(() => {
        this.updateCronograma();
      })).subscribe(_ => {
        this.toasts.showMessage({
          message: 'Data atualizada com sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
      });
  }

}
