import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Estabelecimento } from '@shared/models/estabelecimento';
import { Empresa } from '@shared/models/empresa';
import { GruposApiService } from 'src/app/core/api/grupos-api.service';
import { Grupo } from '../../models/grupo';

@Component({
  selector: 'app-estabelecimento-shared-form',
  templateUrl: './estabelecimento-shared-form.component.html',
  styleUrls: ['./estabelecimento-shared-form.component.css']
})
export class EstabelecimentoSharedFormComponent implements OnInit {

  @Input() estabelecimento: Estabelecimento = new Estabelecimento();
  @Input() empresas: Empresa[] = [];
  @Output() salvarEstabelecimento = new EventEmitter<Estabelecimento>();
  @Output() cancelarEdicao = new EventEmitter<void>();

  grupos: Grupo[];

  constructor(
    private gruposApi: GruposApiService
  ) { }

  ngOnInit() {
    this.gruposApi.getAll()
      .subscribe((grupos: Grupo[]) => {
        this.grupos = grupos;
      });
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
