import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { EmpresasListaComponent } from './components/empresas-lista/empresas-lista.component';
import { SharedModule } from '@shared/shared.module';
import { EmpresaNovaComponent } from './pages/empresa-nova/empresa-nova.component';
import { EmpresaEdicaoComponent } from './pages/empresa-edicao/empresa-edicao.component';

@NgModule({
  declarations: [EmpresasComponent, EmpresasListaComponent, EmpresaNovaComponent, EmpresaEdicaoComponent],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    SharedModule
  ]
})
export class EmpresasModule { }
