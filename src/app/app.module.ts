import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NotFoundComponent } from './modules/not-found/pages/not-found/not-found.component';
import { HomeComponent } from './modules/home/home.component';
import { ForbiddenComponent } from './modules/forbidden/pages/forbidden/forbidden.component';
import { EstabelecimentosModule } from './modules/estabelecimentos/estabelecimentos.module';
import { InterceptorsModule } from './core/interceptors/interceptors.module';

export function tokenGetter() {
  return localStorage.getItem('token');
}

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InterceptorsModule,
    CoreModule,
    EstabelecimentosModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000', 'cipa.4uptech.com.br'],
      }
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
