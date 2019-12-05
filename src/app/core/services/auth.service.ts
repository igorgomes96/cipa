import { Injectable, EventEmitter } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthInfo, Perfil } from '@shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  onUserChanges: EventEmitter<string> = new EventEmitter<string>();

  constructor(private jwtHelper: JwtHelperService) { }

  set token(token: string) {
    localStorage.setItem('token', token);
    this.onUserChanges.emit(token);
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  get decodeToken(): any {
    return this.jwtHelper.decodeToken(this.token);
  }

  get authInfo(): AuthInfo {
    if (!this.decodeToken) {
      return null;
    }
    return {
      id: +this.decodeToken.accid,
      contaAtiva: this.decodeToken.accvalid === 'true',
      email: this.decodeToken.unique_name,
      expiracao: new Date(this.decodeToken.exp),
      nome: this.decodeToken.username,
      qtdaMaxEstabelecimentos: +this.decodeToken.estqty,
      perfil: this.decodeToken.role,
      nomePlano: this.decodeToken.plan
    };
  }

  logout() {
    localStorage.removeItem('token');
  }

  get tokenValido(): boolean {
    return this.token && !this.jwtHelper.isTokenExpired();
  }
}
