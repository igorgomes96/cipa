import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-gestao-form',
  templateUrl: './gestao-form.component.html',
  styleUrls: ['./gestao-form.component.css']
})
export class GestaoFormComponent implements OnInit {

  @ViewChild('form', { static: true }) formGestao: NgForm;

  @Input() gestao: { terminoMandatoAnterior: Date, dataInicio: Date, duracaoGestao: number };
  @Output() statusChange = new EventEmitter<boolean>();

  intervaloDatas = 60;

  constructor() { }

  ngOnInit() {
    const hoje = new Date();
    this.gestao.dataInicio = new Date(hoje.setDate(hoje.getDate() + this.intervaloDatas));
    this.formGestao.statusChanges
      .subscribe(valid => this.statusChange.emit(valid === 'VALID'));
  }

  atualizaDataInicio() {
    this.gestao.dataInicio = new Date(this.gestao.terminoMandatoAnterior.setDate(this.gestao.terminoMandatoAnterior.getDate() + this.intervaloDatas));
    console.log(this.gestao.dataInicio);
  }

}
