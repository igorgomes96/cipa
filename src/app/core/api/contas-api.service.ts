import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { AuthInfo, Conta } from '@shared/models/usuario';
import { EtapaPadraoConta } from '@shared/models/cronograma';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContasApiService extends GenericApi<AuthInfo> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.contas);
  }

  getContaUsuario(): Observable<Conta> {
    return this.http.get<Conta>(`${this.url}`);
  }

  getCronogramaPadrao(): Observable<EtapaPadraoConta[]> {
    return this.http.get<EtapaPadraoConta[]>(`${this.url}cronograma`);
  }

  postEtapaCronogramaPadrao(etapaPadrao: EtapaPadraoConta): Observable<EtapaPadraoConta> {
    return this.http.post<EtapaPadraoConta>(`${this.url}cronograma`, etapaPadrao);
  }

  putEtapaCronogramaPadrao(etapaPadrao: EtapaPadraoConta): Observable<EtapaPadraoConta> {
    return this.http.put<EtapaPadraoConta>(`${this.url}cronograma/${etapaPadrao.id}`, etapaPadrao);
  }

  deleteEtapaCronogramaPadrao(id: number): Observable<EtapaPadraoConta> {
    return this.http.delete<EtapaPadraoConta>(`${this.url}cronograma/${id}`);
  }

}
