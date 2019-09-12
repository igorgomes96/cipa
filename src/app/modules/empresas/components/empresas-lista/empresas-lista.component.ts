import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-empresas-lista',
  templateUrl: './empresas-lista.component.html',
  styleUrls: ['./empresas-lista.component.css']
})
export class EmpresasListaComponent implements OnInit {

  @Input() empresas: Empresa[];
  @Output() excluir = new EventEmitter<Empresa>();
  constructor(
    private toast: ToastsService
  ) { }

  ngOnInit() {
  }

  exclui(empresa: Empresa) {
    this.toast.confirm('Deseja relamente excluir essa empresa? Essa ação não poderá ser desfeita.', 'Confirmação de Exclusão')
      .pipe(filter(confirmacao => confirmacao))
      .subscribe(_ => this.excluir.emit(empresa));
  }

}
