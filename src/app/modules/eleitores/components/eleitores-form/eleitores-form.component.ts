import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Eleitor } from 'src/app/shared/models/eleitor';

@Component({
  selector: 'app-eleitores-form',
  templateUrl: './eleitores-form.component.html',
  styleUrls: ['./eleitores-form.component.css']
})
export class EleitoresFormComponent implements OnInit {

  @Input() eleitor: Eleitor;
  @Output() salvar = new EventEmitter<Eleitor>();
  @Output() cancelar = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    if (!this.eleitor) {
      this.eleitor = new Eleitor();
    }
  }

  reset() {
    this.cancelar.emit();
  }

  submit() {
    this.salvar.emit(this.eleitor);
  }


}
