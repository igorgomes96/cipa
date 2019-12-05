import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';

import { Inscricao, Reprovacao } from '@shared/models/inscricao';
import { ModalService } from 'src/app/core/services/modal.service';

export enum TipoCardEleitor {
  Votacao,
  Aprovacao,
  Visualizacao
}

@Component({
  selector: 'app-card-inscricao',
  templateUrl: './card-inscricao.component.html',
  styleUrls: ['./card-inscricao.component.css']
})
export class CardInscricaoComponent implements OnInit, AfterViewInit {

  TipoCardEleitor: typeof TipoCardEleitor = TipoCardEleitor;

  @Input() candidato: Inscricao;
  @Input() tipo: TipoCardEleitor = TipoCardEleitor.Aprovacao;
  @Output() aprovacao = new EventEmitter<Inscricao>();
  @Output() reprovacao = new EventEmitter<Reprovacao>();
  @Output() votacao = new EventEmitter<Inscricao>();

  @ViewChild('modalReprovacao', { static: false }) modalReprovacao: TemplateRef<any>;

  motivoReprovacao: string = null;
  foto: string = null;

  constructor(private modalService: ModalService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.candidato) {
      // this.candidatosApi.getFoto(this.candidato.id)
      //   .subscribe((foto: string) => {
      //     this.foto = foto;
      //   });
    }
  }

  aprovar() {
    this.aprovacao.emit(this.candidato);
  }

  abrirModalReprovacao() {
    this.modalService.showModal(this.modalReprovacao, 'Reprovação de Inscrição');
  }

  reprovar() {
    const reprovacao = new Reprovacao();
    reprovacao.inscricaoId = this.candidato.id;
    reprovacao.horario = new Date();
    reprovacao.motivoReprovacao = this.motivoReprovacao;

    this.reprovacao.emit(reprovacao);
    this.modalService.closeModal();
  }

  votar() {
    this.votacao.emit(this.candidato);
  }
}
