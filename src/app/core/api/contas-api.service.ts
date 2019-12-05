import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { AuthInfo } from '@shared/models/usuario';
import { EtapaPadraoConta } from '@shared/models/cronograma';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContasApiService extends GenericApi<AuthInfo> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.contas);
  }

  getCronogramaPadrao(contaId: number): Observable<EtapaPadraoConta[]> {
    return this.http.get<EtapaPadraoConta[]>(`${this.url}${contaId}/cronograma`);
  }

  postEtapaCronogramaPadrao(contaId: number, etapaPadrao: EtapaPadraoConta): Observable<EtapaPadraoConta> {
    return this.http.post<EtapaPadraoConta>(`${this.url}${contaId}/cronograma`, etapaPadrao);
  }

  putEtapaCronogramaPadrao(contaId: number, etapaPadrao: EtapaPadraoConta): Observable<EtapaPadraoConta> {
    return this.http.put<EtapaPadraoConta>(`${this.url}${contaId}/cronograma/${etapaPadrao.id}`, etapaPadrao);
  }

  deleteEtapaCronogramaPadrao(contaId: number, id: number): Observable<EtapaPadraoConta> {
    return this.http.delete<EtapaPadraoConta>(`${this.url}${contaId}/cronograma/${id}`);
  }

}
