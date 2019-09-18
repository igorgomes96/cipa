import {  NgForm } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-gestao-form',
  templateUrl: './gestao-form.component.html',
  styleUrls: ['./gestao-form.component.css']
})
export class GestaoFormComponent implements OnInit {

  @ViewChild('form', { static: true }) formGestao: NgForm;

  @Input() gestao: { terminoMandatoAnterior: Date, dataInicio: Date, duracaoGestao: number, teste: string };
  @Output() statusChange = new EventEmitter<boolean>();

  intervaloDatas = 60;

  constructor(private toasts: ToastsService) { }

  ngOnInit() {
    const hoje = new Date();
    this.gestao.dataInicio = new Date(hoje);
    this.gestao.terminoMandatoAnterior = new Date(hoje.setDate(hoje.getDate() + this.intervaloDatas));
    this.formGestao.statusChanges
      .subscribe(valid => this.statusChange.emit(valid === 'VALID'));
  }

  atualizaDataInicio(data: Date) {
    if (this.inicioMaximo(data) > this.gestao.dataInicio) {
      this.gestao.dataInicio = this.inicioMaximo(data);
    }
  }

  validaDataInicio(data: Date) {
    if (data > this.inicioMaximo(this.gestao.terminoMandatoAnterior)) {
      this.toasts.showMessage({
        message: `O início do processo deve ser no mínimo ${this.intervaloDatas} dias antes do término do mandato anterior.`,
        title: 'Data Inválida!',
        type: ToastType.error
      });
      this.gestao.dataInicio = this.inicioMaximo(this.gestao.terminoMandatoAnterior);
    }
  }

  inicioMaximo(terminoMandato: Date): Date {
    const dataAux = new Date(terminoMandato);
    return new Date(dataAux.setDate(dataAux.getDate() - this.intervaloDatas));
  }

}
