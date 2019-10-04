import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EtapaPadraoConta } from 'src/app/shared/models/cronograma';
import { ContasApiService } from 'src/app/core/api/contas-api.service';
import { Conta } from 'src/app/shared/models/usuario';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';

@Component({
  selector: 'app-cronograma-padrao',
  templateUrl: './cronograma-padrao.component.html',
  styleUrls: ['./cronograma-padrao.component.css']
})
export class CronogramaPadraoComponent implements OnInit {

  @Input() conta: Conta;
  @Input() etapas: EtapaPadraoConta[];
  @Output() recarregaCronograma = new EventEmitter<void>();

  constructor(
    private contasApi: ContasApiService,
    private toast: ToastsService
  ) { }

  ngOnInit() {
  }

  adicionar(etapa: EtapaPadraoConta) {
    this.contasApi.postEtapaCronogramaPadrao(this.conta.id, etapa)
    .subscribe(_ => {
      this.recarregaCronograma.emit();
      this.toast.showMessage({
        message: 'Etapa adicionada com sucesso!',
        title: 'Sucesso',
        type: ToastType.success
      });
    });
  }

  cancelar(etapa: EtapaPadraoConta) {
    this.recarregaCronograma.emit();
  }

  excluir(etapa: EtapaPadraoConta) {
    this.contasApi.deleteEtapaCronogramaPadrao(this.conta.id, etapa.id)
    .subscribe(_ => {
      this.recarregaCronograma.emit();
      this.toast.showMessage({
        message: 'Etapa excluída com sucesso!',
        title: 'Sucesso',
        type: ToastType.success
      });
    });
  }

  salvar(etapa: EtapaPadraoConta) {
    this.contasApi.putEtapaCronogramaPadrao(this.conta.id, etapa)
    .subscribe(_ => {
      this.recarregaCronograma.emit();
      this.toast.showMessage({
        message: 'Etapa atualizada com sucesso!',
        title: 'Sucesso',
        type: ToastType.success
      });
    });
  }

}
