import { Location } from '@angular/common';
import { Empresa } from './../../../../shared/models/empresa';
import { Component, OnInit } from '@angular/core';
import { Estabelecimento } from 'src/app/shared/models/estabelecimento';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { EstabelecimentosApiService } from 'src/app/core/api/estabelecimentos-api.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';

@Component({
  selector: 'app-estabelecimento-edicao',
  templateUrl: './estabelecimento-edicao.component.html',
  styleUrls: ['./estabelecimento-edicao.component.css']
})
export class EstabelecimentoEdicaoComponent implements OnInit {

  estabelecimento: Estabelecimento;
  empresas: Empresa[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastsService,
    private estabelecimentosApi: EstabelecimentosApiService,
    private location: Location) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      this.estabelecimento = routeData.estabelecimento;
      this.empresas = routeData.empresas;
    });
  }

  cancelarEdicao() {
    this.location.back();
  }

  salvar() {
    this.estabelecimentosApi.put(this.estabelecimento.id, this.estabelecimento)
      .subscribe(_ => {
        this.toast.showMessage({
          message: 'Estabelecimento atualizado com sucesso!',
          title: 'Sucesso',
          type: ToastType.success
        });
        this.router.navigate(['/estabelecimentos']);
      });
  }

}
