import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inscricao } from '@shared/models/inscricao';
import { TipoCardEleitor } from '@shared/components/card-inscricao/card-inscricao.component';

@Component({
  selector: 'app-inscricoes-lista',
  templateUrl: './inscricoes-lista.component.html',
  styleUrls: ['./inscricoes-lista.component.css']
})
export class InscricoesListaComponent implements OnInit {

  @Input() titulo: string;
  @Input() descricao: string;
  @Input() candidatos: Inscricao[];
  @Input() tipoCard: TipoCardEleitor;
  @Output() aprovacao: EventEmitter<Inscricao> = new EventEmitter<Inscricao>();
  @Output() reprovacao: EventEmitter<Inscricao> = new EventEmitter<Inscricao>();

  constructor() { }

  ngOnInit() {
  }

  onAprovacao(candidato: Inscricao) {
    this.aprovacao.emit(candidato);
  }

  onReprovacao(candidato: Inscricao) {
    this.reprovacao.emit(candidato);
  }

}
