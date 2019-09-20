import { Eleicao } from 'src/app/shared/models/eleicao';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { filter } from 'rxjs/operators';
import { StatusAprovacao } from 'src/app/shared/models/candidato';
import { CodigoEtapaObrigatoria } from 'src/app/shared/models/cronograma';

@Component({
  selector: 'app-eleicao-card',
  templateUrl: './eleicao-card.component.html',
  styleUrls: ['./eleicao-card.component.css']
})
export class EleicaoCardComponent implements OnInit {

  @Input() eleicao: Eleicao;
  @Input() perfilSESMT = false;
  @Output() excluir = new EventEmitter<Eleicao>();

  StatusAprovacao = StatusAprovacao;
  CodigoEtapaObrigatoria = CodigoEtapaObrigatoria;

  constructor(
    private toast: ToastsService
  ) { }

  ngOnInit() {
  }

  excluirEleicao() {
    this.toast.confirm('Tem certeza que deseja excluir essa eleição? Essa ação não poderá ser desfeita', 'Confirmação')
      .pipe(filter(confirmacao => confirmacao)).subscribe(_ => this.excluir.emit(this.eleicao));
  }

  get labelStatusClass() {
    if (!this.eleicao || !this.eleicao.candidato) { return ''; }
    switch (this.eleicao.candidato.statusAprovacao) {
      case StatusAprovacao.Aprovada:
        return 'label-primary';
      case StatusAprovacao.Pendente:
        return 'label-warning';
      case StatusAprovacao.Reprovada:
        return 'label-danger';
      default:
        return '';
    }
  }
}
