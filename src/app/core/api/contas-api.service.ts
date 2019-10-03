import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { AuthInfo } from 'src/app/shared/models/usuario';
import { EtapaPadraoConta } from 'src/app/shared/models/cronograma';
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

}
