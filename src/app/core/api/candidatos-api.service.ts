import { ArquivosApiService } from './arquivos-api.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';

import { GenericApi } from './generic-api';
import { environment } from 'src/environments/environment';
import { Candidato, Reprovacao } from '../../shared/models/candidato';
import { endpoints } from 'src/environments/endpoints';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatosApiService extends GenericApi<Candidato> {

  constructor(private http: HttpClient,
              private arquivosApiService: ArquivosApiService) {
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

  getFoto(id: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.url}${id}/foto`);
  }

  postFoto(id: number, foto: FileList): Observable<HttpEvent<{}>> {
    return this.arquivosApiService.uploadFiles(`${this.url}${id}/foto`, foto);
  }

}
