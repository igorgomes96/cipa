import { NgModule } from '@angular/core';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    AutenticacaoRoutingModule,
    SharedModule
  ]
})
export class AutenticacaoModule { }
