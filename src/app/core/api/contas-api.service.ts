import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { AuthInfo, Conta } from '@shared/models/usuario';
import { EtapaPadraoConta } from '@shared/models/cronograma';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PagedResult } from '@shared/models/paged-result';

@Injectable({
  providedIn: 'root'
})
export class ContasApiService extends GenericApi<AuthInfo> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.contas);
  }

  getList(): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${this.url}list`).pipe(take(1));
  }

  getContaUsuario(): Observable<Conta> {
    return this.http.get<Conta>(`${this.url}`).pipe(take(1));
  }

  getCronogramaPadrao(): Observable<EtapaPadraoConta[]> {
    return this.http.get<EtapaPadraoConta[]>(`${this.url}cronograma`).pipe(take(1));
  }

  postEtapaCronogramaPadrao(etapaPadrao: EtapaPadraoConta): Observable<EtapaPadraoConta> {
    return this.http.post<EtapaPadraoConta>(`${this.url}cronograma`, etapaPadrao).pipe(take(1));
  }

  putEtapaCronogramaPadrao(etapaPadrao: EtapaPadraoConta): Observable<EtapaPadraoConta> {
    return this.http.put<EtapaPadraoConta>(`${this.url}cronograma/${etapaPadrao.id}`, etapaPadrao).pipe(take(1));
  }

  deleteEtapaCronogramaPadrao(id: number): Observable<EtapaPadraoConta> {
    return this.http.delete<EtapaPadraoConta>(`${this.url}cronograma/${id}`).pipe(take(1));
  }

}
