import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Perfil } from '@shared/models/usuario';
import { ToastsService } from '../services/toasts.service';
import { ToastType } from '../components/toasts/toasts.component';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastsService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.tokenValido || this.authService.authInfo.perfil !== Perfil.Administrador) {
      this.toast.showMessage({
        message: 'Usuário sem permissão de acesso',
        title: 'Sem permissão',
        type: ToastType.warning
      });
      this.router.navigate(['/eleicoes']);
      return false;
    }
    return true;
  }
}
