import { NgModule } from '@angular/core';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '@shared/shared.module';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { SolicitarResetComponent } from './pages/solicitar-reset/solicitar-reset.component';
import { ResetSenhaComponent } from './pages/reset-senha/reset-senha.component';
import { FormCadastroComponent } from './components/form-cadastro/form-cadastro.component';

@NgModule({
  declarations: [LoginComponent, CadastroComponent, SolicitarResetComponent, ResetSenhaComponent, FormCadastroComponent],
  imports: [
    AutenticacaoRoutingModule,
    SharedModule
  ]
})
export class AutenticacaoModule { }
