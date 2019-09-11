import { Dimensionamento } from './../../../../shared/models/dimensionamento';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtapaCronograma, PosicaoEtapa } from 'src/app/shared/models/cronograma';
import { Eleicao } from 'src/app/shared/models/eleicao';
import { filter, switchMap, finalize, tap, map } from 'rxjs/operators';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { Arquivo } from 'src/app/shared/models/arquivo';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { CronogramaApiService } from 'src/app/core/api/cronograma-api.service';
import { EtapasObrigatoriasApiService } from 'src/app/core/api/etapas-obrigatorias-api.service';
import { forkJoin, Observable } from 'rxjs';
import { formatDate } from '@angular/common';

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
  dimensionamento: Dimensionamento;
  @ViewChild('modalTemplates', { static: false }) modalTemplates: TemplateRef<any>;
  @ViewChild('modalInfoCronograma', { static: false }) modalInfoCronograma: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private eleicoesApi: EleicoesApiService,
    private cronogramaApi: CronogramaApiService,
    private toasts: ToastsService,
    private modalService: ModalService,
    private etapasObrigatoriasApi: EtapasObrigatoriasApiService) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        map(routeData => routeData.eleicao),
        tap(eleicao => this.eleicao = eleicao),
        switchMap((eleicao: Eleicao) =>
          forkJoin({
            cronograma: this.eleicoesApi.getCronograma(eleicao.id),
            dimensionamento: this.eleicoesApi.getDimensionamento(eleicao.id)
          })
        )
      ).subscribe((detalhes: any) => {
        this.dimensionamento = detalhes.dimensionamento;
        this.eleicao.cronograma = detalhes.cronograma;
      });
  }

  confirmacaoProximaEtapa(proximaEtapa: EtapaCronograma): Observable<boolean> {
    if (proximaEtapa && new Date(proximaEtapa.dataPrevista) > new Date()) {
      return this.toasts
        .confirm(`O fim dessa etapa está previsto para o dia ${formatDate(proximaEtapa.dataPrevista, 'dd/MM/yyyy', 'pt-BR')}.
                  Se não houver nenhuma inconsistência, passaremos para o próxima etapa automaticamente na data prevista.
                  Tem certeza que deseja antecipar a próxima etapa?`, 'Essa ação não pode ser desfeita!');
    }
    return this.toasts
      .confirm(`Tem certeza que deseja passar para a próxima etapa?`, 'Essa ação não pode ser desfeita!');
  }

  get iniciarProcessoText(): string {
    if (!this.eleicao || !this.eleicao.cronograma || !this.eleicao.cronograma.length) {
      return '';
    }
    return new Date(this.eleicao.cronograma[0].dataPrevista) < new Date() ? 'Iniciar Processo' : 'Antecipar Início';
  }

  iniciarProcesso() {
    if (!this.eleicao.cronograma || !this.eleicao.cronograma.length) {
      return;
    }
    this.toasts.confirm(
      `O ínicio do processo está previsto para o dia ${formatDate(this.eleicao.cronograma[0].dataPrevista, 'dd/MM/yyyy', 'pt-BR')}.
      Deseja realmente antecipar?`, 'Confirmação')
      .pipe(
        filter(confirmacao => confirmacao),
        switchMap(_ => this.eleicoesApi.postProximaEtapa(this.eleicao.id))
      ).subscribe(cronograma => {
        this.eleicao.cronograma = cronograma;
        this.toasts.showMessage({
          message: 'Processo iniciado com sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
      });
  }

  private buscaProximaEtapa(etapa: EtapaCronograma): EtapaCronograma {
    const indice = this.eleicao.cronograma.indexOf(etapa) + 1;
    const proximaEtapa = indice >= this.eleicao.cronograma.length ?
      null :
      this.eleicao.cronograma[indice];
    return proximaEtapa;
  }

  proximaEtapa(etapa: EtapaCronograma) {
    this.confirmacaoProximaEtapa(this.buscaProximaEtapa(etapa))
      .pipe(filter(confirmacao => confirmacao))
      .subscribe(_ => {
        this.carregandoProximaEtapa = true;
        this.eleicoesApi.postProximaEtapa(this.eleicao.id)
          .pipe(finalize(() => this.carregandoProximaEtapa = false))
          .subscribe((cronograma: EtapaCronograma[]) => {
            this.eleicao.cronograma = cronograma;
            this.toasts.showMessage({
              message: 'Mudança de etapa concluída com sucesso!',
              title: 'Sucesso!',
              type: ToastType.success
            });
          });
      });
  }

  exibirTemplates(etapa: EtapaCronograma) {
    this.etapasObrigatoriasApi.getTemplates(etapa.etapaObrigatoriaId)
      .subscribe((arquivos: Arquivo[]) => {
        this.templates = arquivos;
        this.modalService.showModal(this.modalTemplates);
      });
  }

  showModalInfoCronograma() {
    this.modalService.showModal(this.modalInfoCronograma, 'Sobre a atualização do cronograma');
  }

  get processoIniciado(): boolean {
    return this.eleicao && this.eleicao.cronograma &&
      !this.eleicao.cronograma.every(e => e.posicaoEtapa === PosicaoEtapa.Futura);
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
