import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Empresa } from 'src/app/core/models/empresa';

@Component({
  selector: 'app-empresa-shared-form',
  templateUrl: './empresa-shared-form.component.html',
  styleUrls: ['./empresa-shared-form.component.css']
})
export class EmpresaSharedFormComponent implements OnInit {

  @Input() empresa: Empresa = new Empresa();
  @Output() salvarEmpresa = new EventEmitter<Empresa>();
  @Output() cancelarEdicao = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  salvar() {
    this.salvarEmpresa.emit(this.empresa);
  }

  cancelar() {
    this.cancelarEdicao.emit();
  }
}
