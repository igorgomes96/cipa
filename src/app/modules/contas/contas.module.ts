import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContasRoutingModule } from './contas-routing.module';
import { ContaUsuarioComponent } from './pages/conta-usuario/conta-usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContaInfoComponent } from './components/conta-info/conta-info.component';
import { UsuariosListaComponent } from './components/usuarios-lista/usuarios-lista.component';
import { UsuarioNovoComponent } from './pages/usuario-novo/usuario-novo.component';
import { UsuarioEdicaoComponent } from './pages/usuario-edicao/usuario-edicao.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';


@NgModule({
  declarations: [ContaUsuarioComponent, ContaInfoComponent, UsuariosListaComponent, UsuarioNovoComponent, UsuarioEdicaoComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    ContasRoutingModule,
    SharedModule
  ]
})
export class ContasModule { }
