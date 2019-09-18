import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Empresa } from 'src/app/shared/models/empresa';
import { EmpresasApiService } from 'src/app/core/api/empresas-api.service';
import { filter, switchMap, map } from 'rxjs/operators';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[];
  constructor(
    private route: ActivatedRoute,
    private empresasApi: EmpresasApiService,
    private toast: ToastsService) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('empresas')),
        map(routeData => routeData.empresas)
      ).subscribe(empresas => {
        this.empresas = empresas;
      });
  }

  exclui(empresa: Empresa) {
    this.empresasApi.delete(empresa.id)
    .pipe(switchMap(_ => this.empresasApi.getAll()))
    .subscribe((empresas: Empresa[]) => {
      this.toast.showMessage({
        message: 'Empresa excluída com sucesso!',
        title: 'Sucesso!',
        type: ToastType.success
      });
      this.empresas = empresas;
    });
  }

}
