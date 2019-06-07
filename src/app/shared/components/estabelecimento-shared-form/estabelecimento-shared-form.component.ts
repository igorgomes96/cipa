import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Estabelecimento } from 'src/app/core/models/estabelecimento';
import { EmpresasApiService } from 'src/app/core/api/empresas-api.service';
import { Empresa } from 'src/app/core/models/empresa';

@Component({
  selector: 'app-estabelecimento-shared-form',
  templateUrl: './estabelecimento-shared-form.component.html',
  styleUrls: ['./estabelecimento-shared-form.component.css']
})
export class EstabelecimentoSharedFormComponent implements OnInit {

  @Input() estabelecimento = new Estabelecimento({id: null, empresaId: null, cidade: null, endereco: null, descricao: null});
  @Input() empresas: Empresa[] = [];
  @Output() salvarEstabelecimento = new EventEmitter<Estabelecimento>();
  @Output() cancelarEdicao = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    if (this.empresas.length === 1) {
      this.estabelecimento.empresaId = this.empresas[0].id;
    }
  }

  salvar() {
    this.salvarEstabelecimento.emit(this.estabelecimento);
  }

  cancelar() {
    this.cancelarEdicao.emit();
  }

}
