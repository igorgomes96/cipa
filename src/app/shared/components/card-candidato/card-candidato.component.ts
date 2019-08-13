import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';

import { Candidato, Reprovacao } from 'src/app/shared/models/candidato';
import { ModalService } from 'src/app/core/services/modal.service';
import { CandidatosApiService } from 'src/app/core/api/candidatos-api.service';

export enum TipoCardEleitor {
  Votacao,
  Aprovacao,
  Visualizacao
}

@Component({
  selector: 'app-card-candidato',
  templateUrl: './card-candidato.component.html',
  styleUrls: ['./card-candidato.component.css']
})
export class CardCandidatoComponent implements OnInit, AfterViewInit {

  TipoCardEleitor: typeof TipoCardEleitor = TipoCardEleitor;

  @Input() candidato: Candidato;
  @Input() tipo: TipoCardEleitor = TipoCardEleitor.Aprovacao;
  @Output() aprovacao = new EventEmitter<Candidato>();
  @Output() reprovacao = new EventEmitter<Reprovacao>();
  @Output() votacao = new EventEmitter<Candidato>();

  @ViewChild('modalReprovacao', { static: false }) modalReprovacao: TemplateRef<any>;

  motivoReprovacao: string = null;
  foto: string = null;

  constructor(
    private modalService: ModalService,
    private candidatosApi: CandidatosApiService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.candidato) {
      this.candidatosApi.getFoto(this.candidato.id)
        .subscribe((foto: string) => {
          this.foto = foto;
        });
    }
  }

  aprovar() {
    this.aprovacao.emit(this.candidato);
  }

  abrirModalReprovacao() {
    this.modalService.showModal(this.modalReprovacao, 'Reprovação de Candidatura');
  }

  reprovar() {
    const reprovacao = new Reprovacao();
    reprovacao.candidatoId = this.candidato.id;
    reprovacao.horario = new Date();
    reprovacao.motivoReprovacao = this.motivoReprovacao;

    this.reprovacao.emit(reprovacao);
    this.modalService.closeModal();
  }

  votar() {
    this.votacao.emit(this.candidato);
  }
}
