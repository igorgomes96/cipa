import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { Candidato, Reprovacao } from '../models/candidato';
import { endpoints } from 'src/environments/endpoints';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatosApiService extends GenericApi<Candidato> {

  constructor(private http: HttpClient) {
    super(http, environment.api + endpoints.candidatos);
  }

  postAprovar(id: number): Observable<Candidato> {
    return this.get(id);
    // return this.http.post<Candidato>(`${this.url}${id}/aprovar`, null);
  }

  postReprovar(id: number, reprovacao: Reprovacao): Observable<Reprovacao> {
    return of(reprovacao);
    // return this.http.post<Reprovacao>(`${this.url}${id}/reprovar`, reprovacao);
  }

}
