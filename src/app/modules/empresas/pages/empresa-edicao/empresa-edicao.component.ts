import { EmpresasApiService } from './../../../../core/api/empresas-api.service';
import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ToastType } from 'src/app/shared/components/toasts/toasts.component';
import { ToastsService } from 'src/app/core/services/toasts.service';

@Component({
  selector: 'app-empresa-edicao',
  templateUrl: './empresa-edicao.component.html',
  styleUrls: ['./empresa-edicao.component.css']
})
export class EmpresaEdicaoComponent implements OnInit {

  empresa: Empresa;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastsService,
    private empresasApi: EmpresasApiService) { }

  ngOnInit() {
    this.route.data
      .pipe(
        filter(routeData => routeData.hasOwnProperty('empresa')),
        map(routeData => routeData.empresa)
      ).subscribe(empresa => {
        this.empresa = empresa;
      });
  }

  cancelarEdicao() {
    this.router.navigate(['/empresas']);
  }

  salvar() {
    this.empresasApi.put(this.empresa.id, this.empresa)
      .subscribe(_ => {
        this.toast.showMessage({
          message: 'Empresa atualizada com sucesso!',
          title: 'Sucesso',
          type: ToastType.success
        });
        this.router.navigate(['/empresas']);
      });
  }

}
