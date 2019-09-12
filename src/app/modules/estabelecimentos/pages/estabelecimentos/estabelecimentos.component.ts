import { EstabelecimentosApiService } from 'src/app/core/api/estabelecimentos-api.service';
import { Component, OnInit } from '@angular/core';
import { Estabelecimento } from 'src/app/shared/models/estabelecimento';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';

@Component({
  selector: 'app-estabelecimentos',
  templateUrl: './estabelecimentos.component.html',
  styleUrls: ['./estabelecimentos.component.css']
})
export class EstabelecimentosComponent implements OnInit {

  estabelecimentos: Estabelecimento[];
  constructor(
    private route: ActivatedRoute,
    private estabelecimentosApi: EstabelecimentosApiService,
    private toast: ToastsService) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('estabelecimentos')),
        map(routeData => routeData.estabelecimentos)
      ).subscribe(estabelecimentos => {
        this.estabelecimentos = estabelecimentos;
      });
  }

  estabelecimentoExcluido(estabelecimento: Estabelecimento) {
    this.estabelecimentosApi.getAll()
      .subscribe((estabelecimentos: Estabelecimento[]) => {
        this.toast.showMessage({
          message: 'Estabelecimento excluído com sucesso!',
          title: 'Succeso',
          type: ToastType.success
        });
        this.estabelecimentos = estabelecimentos;
      });
  }

}
