import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtapaCronograma, PosicaoEtapa } from '@shared/models/cronograma';
import { Eleicao } from '@shared/models/eleicao';
import { filter, switchMap, finalize, tap, map, catchError } from 'rxjs/operators';
import { EleicoesApiService } from 'src/app/core/api/eleicoes-api.service';
import { Arquivo } from '@shared/models/arquivo';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { EtapasObrigatoriasApiService } from 'src/app/core/api/etapas-obrigatorias-api.service';
import { Observable, throwError } from 'rxjs';
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
  @ViewChild('modalTemplates', { static: false }) modalTemplates: TemplateRef<any>;
  @ViewChild('modalInfoCronograma', { static: false }) modalInfoCronograma: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eleicoesApi: EleicoesApiService,
    private toasts: ToastsService,
    private modalService: ModalService,
    private etapasObrigatoriasApi: EtapasObrigatoriasApiService) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        map(routeData => routeData.eleicao),
        tap(eleicao => this.eleicao = eleicao),
        switchMap((eleicao: Eleicao) => this.eleicoesApi.getCronograma(eleicao.id))
      ).subscribe((cronograma: EtapaCronograma[]) => {
        this.eleicao.cronograma = cronograma;
      });
  }

  recarregaCronograma() {
    if (this.eleicao) {
      this.eleicoesApi.getCronograma(this.eleicao.id)
        .subscribe((cronograma: EtapaCronograma[]) => {
          this.eleicao.cronograma = cronograma;
        });
    }
  }

  confirmacaoProximaEtapa(proximaEtapa: EtapaCronograma): Observable<boolean> {
    if (proximaEtapa && new Date(proximaEtapa.dataPrevista) > new Date()) {
      return this.toasts
        .confirmModal(`O fim dessa etapa está previsto para o dia ${formatDate(proximaEtapa.dataPrevista, 'dd/MM/yyyy', 'pt-BR')}.
                  Se não houver nenhuma inconsistência, passaremos para o próxima etapa automaticamente na data prevista.
                  Tem certeza que deseja antecipar a próxima etapa?`, 'Essa ação não pode ser desfeita!');
    }
    return this.toasts
      .confirmModal(`Tem certeza que deseja passar para a próxima etapa?`, 'Essa ação não pode ser desfeita!');
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

    if (!this.eleicao.dimensionamento.qtdaEleitores) {
      this.toasts.errorModal(
        `Verificamos que ainda não há nenhum eleitor cadastrado.
        Direcionaremos você para a tela de eleitores para a realização do cadastro.
        Lembrando que você pode fazer o cadastro em massa via importação de planilha e/ou cadastrar manualmente.`)
        .subscribe(_ => this.router.navigate(['../eleitores'], { relativeTo: this.route.parent }));
      return;
    }

    if (!(this.eleicao.dimensionamento.qtdaEfetivos + this.eleicao.dimensionamento.qtdaSuplentes)) {
      this.toasts.errorModal(
        `Verificamos que há somente ${this.eleicao.dimensionamento.qtdaEleitores} eleitores cadastrados.
        Para estabelecimentos com esse número de funcionários não há necessidade de haverem representantes da CIPA.
        Consulte a tabela de dimensionamento na NR-5.`);
      return;
    }

    this.toasts.confirmModal(
      `O ínicio do processo está previsto para o dia ${formatDate(this.eleicao.cronograma[0].dataPrevista, 'dd/MM/yyyy', 'pt-BR')}.
      Deseja realmente antecipar?`, 'Confirmação')
      .pipe(
        filter(confirmacao => confirmacao),
        switchMap(_ => this.eleicoesApi.postProximaEtapa(this.eleicao.id))
      ).subscribe(cronograma => this.alteracaoCronograma(cronograma, 'Processo iniciado com sucesso!'));
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
          .subscribe(cronograma => this.alteracaoCronograma(cronograma, 'Mudança de etapa concluída com sucesso!'));
      });
  }

  private alteracaoCronograma(cronograma: EtapaCronograma[], mensagem: string): void {
    this.eleicao.cronograma = cronograma;
    this.toasts.showMessage({
      message: mensagem,
      title: 'Sucesso!',
      type: ToastType.success
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

  atualizarDimensionamento() {
    this.eleicoesApi.postAtualizarDimensionamento(this.eleicao.id)
      .pipe(switchMap(_ => this.eleicoesApi.get(this.eleicao.id)))
      .subscribe(eleicao => {
        eleicao.cronograma = this.eleicao.cronograma;
        this.eleicao = eleicao;
      });
  }


  atualizarEtapa(etapa: EtapaCronograma) {
    this.eleicoesApi.putAtualizaEtapaCronograma(this.eleicao.id, etapa)
      .pipe(catchError(err => {
        this.updateCronograma();
        return throwError(err);
      })).subscribe(cronograma => {
        this.eleicao.cronograma = cronograma;
        this.toasts.showMessage({
          message: 'Etapa atualizada com sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
      });
  }

}
