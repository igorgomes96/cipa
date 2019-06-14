import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EtapaCronograma, PosicaoEtapa } from 'src/app/core/models/cronograma';
import { Arquivo } from 'src/app/core/models/arquivo';
import { FormGroup, FormBuilder } from '@angular/forms';

declare var $: any;

@Component({
  selector: '[etapa-cronograma]',
  templateUrl: './etapa-cronograma.component.html',
  styleUrls: ['./etapa-cronograma.component.css']
})
export class EtapaCronogramaComponent implements OnInit {

  @Input() etapa: EtapaCronograma;
  @Input() arquivos: Arquivo[];
  @Input() layout = 'Visualização';
  @Output() proximaEtapa: EventEmitter<EtapaCronograma> = new EventEmitter<EtapaCronograma>();
  @Output() exibirTemplates: EventEmitter<EtapaCronograma> = new EventEmitter<EtapaCronograma>();
  @Output() atualizarEtapa: EventEmitter<EtapaCronograma> = new EventEmitter<EtapaCronograma>();

  PosicaoEtapa: typeof PosicaoEtapa = PosicaoEtapa;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      data: [{ value: this.etapa.dataPrevista, disabled: this.isDateDisabled }]
    });
    this.form.get('data').valueChanges.subscribe((v) => {
      this.onAtualizarEtapa();
    });
  }

  get isDateDisabled() {
    return this.layout === 'Visualização' && this.etapa.posicaoEtapa === PosicaoEtapa.Passada;
  }

  get calendarIcon(): string {
    if (this.layout === 'Cadastro') {
      return 'fa-calendar';
    }

    switch (this.etapa.posicaoEtapa) {
      case PosicaoEtapa.Atual:
        return 'fa-calendar';
      case PosicaoEtapa.Passada:
        return 'fa-calendar-check-o';
      case PosicaoEtapa.Futura:
        return 'fa-calendar-o';
      default:
        return '';
    }
  }

  get calendarClass(): string {

    if (this.layout === 'Cadastro') {
      return 'blue-bg';
    }

    switch (this.etapa.posicaoEtapa) {
      case PosicaoEtapa.Atual:
        return 'blue-bg';
      case PosicaoEtapa.Passada:
        return 'navy-bg';
      case PosicaoEtapa.Futura:
        return 'bg-muted';
      default:
        return '';
    }
  }

  get tamanhoDescricao(): string {
    if (this.layout === 'Cadastro' || this.etapa.posicaoEtapa === PosicaoEtapa.Futura) {
      return 'col-md-12';
    } else {
      return 'col-lg-8 col-md-7';
    }
  }


  onProximaEtapa() {
    this.proximaEtapa.emit(this.etapa);
  }

  onExibirTemplates() {
    this.exibirTemplates.emit(this.etapa);
  }

  onAtualizarEtapa() {
    this.atualizarEtapa.emit(this.etapa);
  }

}
