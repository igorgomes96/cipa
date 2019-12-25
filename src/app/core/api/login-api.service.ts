import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from '@env/endpoints';
import { Usuario } from '@shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  constructor(private http: HttpClient) { }

  private url = environment.api + endpoints.login;

  login(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.url}login`, usuario);
  }

  buscaPeloCodigoRecuperacao(codigo: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}codigorecuperacao/${codigo}`);
  }

  cadastrarSenha(usuario: Usuario): Observable<any> {
    return this.http.put(`${this.url}cadastrarsenha`, usuario);
  }

  resetarSenha(email: string): Observable<void> {
    return this.http.put<void>(`${this.url}resetarsenha`, { email });
  }

}
