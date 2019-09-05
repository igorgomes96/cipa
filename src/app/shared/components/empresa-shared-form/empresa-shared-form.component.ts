import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa';

@Component({
  selector: 'app-empresa-shared-form',
  templateUrl: './empresa-shared-form.component.html',
  styleUrls: ['./empresa-shared-form.component.css']
})
export class EmpresaSharedFormComponent implements OnInit {

  @Input() empresa: Empresa = new Empresa();
  @Output() salvarEmpresa = new EventEmitter<Empresa>();
  @Output() cancelarEdicao = new EventEmitter<void>();

  cnpjMask = {
    mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  };

  constructor() { }

  ngOnInit() {
  }

  salvar() {
    this.empresa.cnpj = this.getOnlyNumbers(this.empresa.cnpj);
    this.salvarEmpresa.emit(this.empresa);
  }

  cancelar() {
    this.cancelarEdicao.emit();
  }

  private getOnlyNumbers(text: string): string {
    const numb = text.match(/\d/g);
    return numb.join('');
  }
}
