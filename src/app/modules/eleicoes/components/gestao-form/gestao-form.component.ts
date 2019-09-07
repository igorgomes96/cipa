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

  @Input() gestao: { dataInicio: Date, duracaoGestao: number };
  @Output() statusChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.formGestao.statusChanges
      .subscribe(valid => this.statusChange.emit(valid === 'VALID'));
  }

}
