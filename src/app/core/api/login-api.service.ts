import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from '../../../environments/endpoints';
import { Usuario } from '../../shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  constructor(private http: HttpClient) { }

  private url = environment.api + endpoints.login;

  login(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.url, usuario);
  }

  buscaPeloCodigoRecuperacao(codigo: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}recuperacao/${codigo}`);
  }

  resetSenha(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.url}reset`, usuario);
  }

}
