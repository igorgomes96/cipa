import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { Usuario } from 'src/app/shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosApiService extends GenericApi<Usuario> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.usuarios);
  }

  getUsuarioLogado(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}logado`);
  }

}
