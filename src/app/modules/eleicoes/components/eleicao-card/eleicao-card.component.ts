import { Eleicao } from 'src/app/shared/models/eleicao';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PanelOption } from 'src/app/shared/components/panel/panel-option';

@Component({
  selector: 'app-eleicao-card',
  templateUrl: './eleicao-card.component.html',
  styleUrls: ['./eleicao-card.component.css']
})
export class EleicaoCardComponent implements OnInit {

  @Input() eleicao: Eleicao;
  @Output() editar = new EventEmitter<Eleicao>();

  constructor() { }

  ngOnInit() {
  }

  onEditar() {
    this.editar.emit(this.eleicao);
  }
}
