import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Candidato } from 'src/app/shared/models/candidato';
import { TipoCardEleitor } from 'src/app/shared/components/card-candidato/card-candidato.component';

@Component({
  selector: 'app-candidaturas-lista',
  templateUrl: './candidaturas-lista.component.html',
  styleUrls: ['./candidaturas-lista.component.css']
})
export class CandidaturasListaComponent implements OnInit {

  @Input() titulo: string;
  @Input() descricao: string;
  @Input() candidatos: Candidato[];
  @Input() tipoCard: TipoCardEleitor;
  @Output() aprovacao: EventEmitter<Candidato> = new EventEmitter<Candidato>();
  @Output() reprovacao: EventEmitter<Candidato> = new EventEmitter<Candidato>();

  constructor() { }

  ngOnInit() {
  }

  onAprovacao(candidato: Candidato) {
    this.aprovacao.emit(candidato);
  }

  onReprovacao(candidato: Candidato) {
    this.reprovacao.emit(candidato);
  }

}
