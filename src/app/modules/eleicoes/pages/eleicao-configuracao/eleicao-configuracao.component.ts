import { Eleicao } from '@shared/models/eleicao';
import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '@core/services/modal.service';
import { Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { EleicoesApiService } from '@core/api/eleicoes-api.service';
import { ToastsService } from '@core/services/toasts.service';
import { ToastType } from '@core/components/toasts/toasts.component';

@Component({
  templateUrl: './eleicao-configuracao.component.html',
  styleUrls: ['./eleicao-configuracao.component.css']
})
export class EleicaoConfiguracaoComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modalConfiguracao', { static: false }) modalConfiguracao: TemplateRef<any>;

  private subscriptions = new Subscription();
  eleicao: Eleicao;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute,
    private eleicoesApi: EleicoesApiService,
    private toasts: ToastsService) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('eleicao')),
        map(routeData => routeData.eleicao), take(1)
      ).subscribe(eleicao => this.eleicao = eleicao);

    this.subscriptions.add(
      this.modalService.showModalEmitter
      .pipe(filter(abrir => !abrir))
      .subscribe(_ => this.router.navigate(['/eleicoes'])));
  }

  ngAfterViewInit() {
    this.modalService.showModal(this.modalConfiguracao, 'Configurações');
  }

  salvarConfiguracoes() {
    this.eleicoesApi.postConfiguracoes(this.eleicao.id, this.eleicao.configuracao)
      .subscribe(_ => {
        this.toasts.showMessage({
          message: 'Configurações atualizadas com sucesso!',
          title: 'Sucesso!',
          type: ToastType.success
        });
        this.modalService.closeModal();
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
