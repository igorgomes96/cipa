import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { Eleicao } from '../../shared/models/eleicao';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/environments/endpoints';
import { EtapaCronograma } from '../../shared/models/cronograma';
import { Observable } from 'rxjs';
import { Eleitor } from '../../shared/models/eleitor';

@Injectable({
  providedIn: 'root'
})
export class EleicoesApiService extends GenericApi<Eleicao> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.eleicoes);
  }

  getCronograma(idEleicao: number): Observable<EtapaCronograma[]> {
    // return super.get(idEleicao).pipe(map(eleicao => eleicao.cronograma));
    return this.http.get<EtapaCronograma[]>(`${this.url}${idEleicao}/cronograma`);
  }

  getEleitores(idEleicao: number): Observable<Eleitor[]> {
    // return this.http.get<Eleitor[]>(`${environment.api}${endpoints.eleitores}`);
    return this.http.get<Eleitor[]>(`${this.url}${idEleicao}/eleitores`);
  }

}
