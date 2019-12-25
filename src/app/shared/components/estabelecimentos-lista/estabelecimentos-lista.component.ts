import { EstabelecimentosApiService } from 'src/app/core/api/estabelecimentos-api.service';
import { Estabelecimento } from '@shared/models/estabelecimento';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-estabelecimentos-lista',
  templateUrl: './estabelecimentos-lista.component.html',
  styleUrls: ['./estabelecimentos-lista.component.css']
})
export class EstabelecimentosListaComponent implements OnInit {

  @Input() estabelecimentos: Estabelecimento[];
  @Output() estabelecimentoExcluido = new EventEmitter<Estabelecimento>();
  constructor(
    private toast: ToastsService,
    private estabelecimentosApi: EstabelecimentosApiService
  ) { }

  ngOnInit() {
  }

  exclui(estabelecimento: Estabelecimento) {
    this.toast.confirmModal('Deseja realmente excluir esse estabelecimento? Essa ação não poderá ser desfeita.', 'Confirmação de Exclusão')
    .pipe(
      filter(confirmacao => confirmacao),
      switchMap(_ => this.estabelecimentosApi.delete(estabelecimento.id))
    )
    .subscribe(_ => {
      this.estabelecimentoExcluido.emit(estabelecimento);
    });
  }

}
