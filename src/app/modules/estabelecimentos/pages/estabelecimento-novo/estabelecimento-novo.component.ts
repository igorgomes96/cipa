import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EstabelecimentosApiService } from 'src/app/core/api/estabelecimentos-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { Estabelecimento } from 'src/app/shared/models/estabelecimento';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';
import { Empresa } from 'src/app/shared/models/empresa';

@Component({
  selector: 'app-estabelecimento-novo',
  templateUrl: './estabelecimento-novo.component.html',
  styleUrls: ['./estabelecimento-novo.component.css']
})
export class EstabelecimentoNovoComponent implements OnInit {

  empresas: Empresa[];
  constructor(
    private router: Router,
    private estabelecimentosApi: EstabelecimentosApiService,
    private toast: ToastsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      this.empresas = routeData.empresas;
    });
  }

  cancelarEdicao() {
    this.router.navigate(['/estabelecimentos']);
  }

  salvar(estabelecimento: Estabelecimento) {
    this.estabelecimentosApi.post(estabelecimento)
      .subscribe(_ => {
        this.toast.showMessage({
          message: 'Estabelecimento cadastrado com sucesso!',
          title: 'Sucesso',
          type: ToastType.success
        });
        this.router.navigate(['/estabelecimentos']);
      });
  }

}
