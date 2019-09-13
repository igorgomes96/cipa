import { Injectable, EventEmitter } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthInfo, Perfil } from 'src/app/shared/models/usuario';

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
    return {
      conta: +this.decodeToken.accid,
      contaValida: this.decodeToken.accvalid === 'true',
      email: this.decodeToken.unique_name[1],
      expiracao: new Date(this.decodeToken.exp),
      nome: this.decodeToken.unique_name[0],
      qtdaMaxEstabelecimentos: +this.decodeToken.estqty,
      perfil: this.decodeToken.role
    };
  }

  logout() {
    localStorage.removeItem('token');
  }
}
