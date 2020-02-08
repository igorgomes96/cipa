import { Location } from '@angular/common';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Perfil } from '@shared/models/usuario';
import { Router, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private _topnavRotas = [
    {
      link: '/eleicoes',
      label: 'Eleições'
    },
    {
      link: '/empresas',
      label: 'Empresas'
    },
    {
      link: '/estabelecimentos',
      label: 'Estabelecimentos'
    }
  ];

  constructor(
    private authService: AuthService,
    private location: Location,
    private router: Router) { }

  toggleNavigationEmitter = new EventEmitter<void>();
  leftNavLinkEmitter = new EventEmitter<void>();
  private urlsAdmin = ['/contas'];
  private urlsAdminStartsWith = ['/contas/administradores'];

  toggleNavigation() {
    this.toggleNavigationEmitter.emit();
  }

  updateLeftNavLinks() {
    this.leftNavLinkEmitter.emit();
  }

  private get isUrlAdmin(): boolean {
    return this.urlsAdmin.indexOf(this.location.path()) >= 0 ||
      this.urlsAdminStartsWith.some(url => this.location.path().startsWith(url));
  }


  get topnavRotas() {
    if (!this.authService.authInfo || this.authService.authInfo.perfil === Perfil.Eleitor || this.isUrlAdmin) {
      return [];
    }
    return this._topnavRotas;
  }

  navigateToHome() {
    if (this.authService.authInfo && this.authService.authInfo.perfil === Perfil.Administrador
      && (this.location.path() === '/eleicoes' || this.isUrlAdmin)) {
      this.router.navigate(['/contas']);
    } else {
      this.router.navigate(['/eleicoes']);
    }
  }

  navigateToConta() {
    if (this.authService.authInfo && this.authService.authInfo.perfil === Perfil.Administrador && this.isUrlAdmin) {
      this.router.navigate(['/contas/administradores']);
    } else {
      this.router.navigate(['/contas/minha-conta']);
    }
  }


}
