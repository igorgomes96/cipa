import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { Usuario } from '@shared/models/usuario';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosApiService extends GenericApi<Usuario> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.usuarios);
  }

  getUsuarioLogado(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}logado`).pipe(take(1));
  }

  getUsuariosAdministradores(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}administradores`).pipe(take(1));
  }

  postUsuarioAdministrador(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}administradores`, usuario).pipe(take(1));
  }

  putUsuarioAdministrador(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}${id}/administradores`, usuario).pipe(take(1));
  }

}
