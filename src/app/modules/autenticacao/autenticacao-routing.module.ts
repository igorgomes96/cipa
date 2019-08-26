import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SolicitarResetComponent } from './pages/solicitar-reset/solicitar-reset.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ResetSenhaComponent } from './pages/reset-senha/reset-senha.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { showFooter: false } },
  { path: 'recuperacao', component: SolicitarResetComponent, data: { showFooter: false } },
  { path: 'reset', component: ResetSenhaComponent, data: { showFooter: false } },
  { path: 'cadastro', component: CadastroComponent, data: { showFooter: false } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacaoRoutingModule { }
