import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EtapaPadraoConta } from 'src/app/shared/models/cronograma';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { filter, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-etapa-padrao',
  templateUrl: './etapa-padrao.component.html',
  styleUrls: ['./etapa-padrao.component.css']
})
export class EtapaPadraoComponent implements OnInit {

  @Input() etapa: EtapaPadraoConta;
  @Output() excluir = new EventEmitter<EtapaPadraoConta>();
  @Output() adicionar = new EventEmitter<EtapaPadraoConta>();
  @Output() salvar = new EventEmitter<EtapaPadraoConta>();
  @Output() cancelar = new EventEmitter<EtapaPadraoConta>();

  editando = false;

  constructor(
    private toasts: ToastsService
  ) { }

  ngOnInit() {
  }

  habilitarEdicao() {
    this.editando = true;
  }

  onAtualizarEtapa() {
    this.editando = false;
    this.salvar.emit(this.etapa);
  }

  onCancelarEdicao() {
    this.editando = false;
    this.cancelar.emit(this.etapa);
  }

  onExcluir() {
    this.toasts.confirm('Tem certeza que deseja excluir essa etapa do cronograma padrão?', 'Confirmação')
      .pipe(filter(confirmacao => confirmacao))
      .subscribe(_ => this.excluir.emit(this.etapa));
  }

  onAdicionar() {
    const novaEtapa: EtapaPadraoConta = {
      contaId: this.etapa.contaId,
      descricao: 'Descreva aqui o propósito dessa etapa...',
      nome: 'Nova Etapa Adicionada',
      duracaoPadrao: 0,
      etapaObrigatoriaId: undefined,
      id: undefined,
      ordem: this.etapa.ordem + 1
    };
    this.toasts.confirm(`Tem certeza que deseja adicionar ao cronograma padrão uma nova etapa depois da etapa ${this.etapa.nome}?`,
      'Confirmação').pipe(filter(confirmacao => confirmacao))
      .subscribe(_ => this.adicionar.emit(novaEtapa));
  }

}
