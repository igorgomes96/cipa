import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContasRoutingModule } from './contas-routing.module';
import { ContaUsuarioComponent } from './pages/conta-usuario/conta-usuario.component';
import { SharedModule } from '@shared/shared.module';
import { ContaInfoComponent } from './components/conta-info/conta-info.component';
import { UsuariosListaComponent } from './components/usuarios-lista/usuarios-lista.component';
import { UsuarioNovoComponent } from './pages/usuario-novo/usuario-novo.component';
import { UsuarioEdicaoComponent } from './pages/usuario-edicao/usuario-edicao.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { CronogramaPadraoComponent } from './components/cronograma-padrao/cronograma-padrao.component';
import { EtapaPadraoComponent } from './components/etapa-padrao/etapa-padrao.component';
import { ContasListaComponent } from './pages/contas-lista/contas-lista.component';
import { CardContaComponent } from './components/card-conta/card-conta.component';
import { AdministradoresComponent } from './pages/administradores/administradores.component';
import { UsuarioAdminNovoComponent } from './pages/usuario-admin-novo/usuario-admin-novo.component';
import { UsuarioAdminEdicaoComponent } from './pages/usuario-admin-edicao/usuario-admin-edicao.component';


@NgModule({
  declarations: [
    ContaUsuarioComponent,
    ContaInfoComponent,
    UsuariosListaComponent,
    UsuarioNovoComponent,
    UsuarioEdicaoComponent,
    UsuarioFormComponent,
    CronogramaPadraoComponent,
    EtapaPadraoComponent,
    ContasListaComponent,
    CardContaComponent,
    AdministradoresComponent,
    UsuarioAdminNovoComponent,
    UsuarioAdminEdicaoComponent,
  ],
  imports: [
    CommonModule,
    ContasRoutingModule,
    SharedModule
  ]
})
export class ContasModule { }
