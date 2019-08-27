import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SolicitarResetComponent } from './pages/solicitar-reset/solicitar-reset.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ResetSenhaComponent } from './pages/reset-senha/reset-senha.component';
import { CodigoRecuperacaoResolverService } from 'src/app/core/resolvers/codigo-recuperacao-resolver.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { showFooter: false } },
  { path: 'recuperacao', component: SolicitarResetComponent, data: { showFooter: false } },
  {
    path: 'reset/:codigo',
    component: ResetSenhaComponent,
    data: { showFooter: false },
    resolve: {
      usuario: CodigoRecuperacaoResolverService
    }
  },
  {
    path: 'cadastro/:codigo',
    component: CadastroComponent,
    data: { showFooter: false },
    resolve: {
      usuario: CodigoRecuperacaoResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacaoRoutingModule { }
