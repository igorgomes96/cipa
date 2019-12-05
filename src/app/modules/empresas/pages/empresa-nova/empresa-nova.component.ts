import { Empresa } from '@shared/models/empresa';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresasApiService } from 'src/app/core/api/empresas-api.service';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastType } from 'src/app/core/components/toasts/toasts.component';

@Component({
  selector: 'app-empresa-nova',
  templateUrl: './empresa-nova.component.html',
  styleUrls: ['./empresa-nova.component.css']
})
export class EmpresaNovaComponent implements OnInit {

  constructor(
    private router: Router,
    private empresasApi: EmpresasApiService,
    private toast: ToastsService
  ) { }

  ngOnInit() {
  }

  cancelarEdicao() {
    this.router.navigate(['/empresas']);
  }

  salvar(empresa: Empresa) {
    this.empresasApi.post(empresa)
      .subscribe(_ => {
        this.toast.showMessage({
          message: 'Empresa cadastrada com sucesso!',
          title: 'Sucesso',
          type: ToastType.success
        });
        this.router.navigate(['/empresas']);
      });
  }

}
